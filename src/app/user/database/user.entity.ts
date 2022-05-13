import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserAuthToken } from '../../auth/database/userAuthToken.entity';
import {UserFields} from '../common/user.fields';
import {Promocode} from '../../promocode/database/promocode.entity';

@Entity('users')
export class User extends UserFields {
  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_at?: Date;

  @Column({ type: 'integer', nullable: true })
  creator_user_id?: number;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'creator_user_id',
  })
  creator_user?: User;

  @Column({
    type: 'varchar',
    length: 255,
  })
  password_hash: string;

  @OneToMany(() => UserAuthToken, (token) => token.user)
  authTokens: UserAuthToken[];

  @OneToMany(() => Promocode, (promocode) => promocode.owner)
  promocodes: Promocode[];
}
