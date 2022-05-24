import {Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {FindConditions, Repository} from 'typeorm';

import { applyChanges } from '../../../utils/object';
import { User } from '../database/user.entity';
import {UserUpdateDto} from './user.dtos';
import {isEmail, isPhoneNumber} from 'class-validator';
import {SignUpDto} from '../../auth/rest/auth.dtos';
import {saltRounds} from '../../../config/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  /**
   * Создает пользователя с заданными параметрами
   */
  public async createUser(args: SignUpDto) {
    const {name, email, password} = args;
    const user = this.userRepo.create({
      name,
      email,
    });

    await this.changeUserPassword(user, password);

    return user;
  }

  public async updateUser(id: number, args: UserUpdateDto) {
    const {password, ...changes} = args;

    const user = await this.userRepo.findOneOrFail({where:{id}});

    applyChanges(user, changes);

    return this.userRepo.save(user);
  }

  public async getByEmail(email: string) {
    return this.userRepo.findOne({ where:{email} });
  }

  public async getByIdOrFail(id: number, relations?: string[]): Promise<User> {
    return this.userRepo.findOneOrFail({where:{id}, relations});
  }

  public async getById(id: number): Promise<User | null> {
    return this.userRepo.findOne(id);
  }

  public async delete(id: number): Promise<boolean> {
    return !!(await this.userRepo.delete(id));
  }

  public async getAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  /**
   * Сохраняет/перезаписывает хеш пользовательского пароля
   */
  public async changeUserPassword(user: User, password: string) {
    user.password_hash = await this.hashPassword(password);

    return this.userRepo.save(user);
  }

  /**
   * Проверяет username и пароль пользователя и возвращает подходящего
   * пользователя в случае успеха. В случае ошибки поднимается исключение,
   * которое интерпретируется как HTTP-ошибка 401
   */
  public async checkUserCredentials(email: string, password: string) {
    const user = await this.userRepo.findOne({
      email,
    });

    if (!user) {
      throw new UnauthorizedException(`Provided credentials were invalid`);
    }

    const result = await this.checkPassword(password, user.password_hash);

    if (!result) {
      throw new UnauthorizedException(`Provided credentials were invalid`);
    }

    return user;
  }

  /**
   * Возвращает хеш пароля
   */
  public async hashPassword(password: string) {
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Проверяет, что пароль соотносится с хешом
   */
  public async checkPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
