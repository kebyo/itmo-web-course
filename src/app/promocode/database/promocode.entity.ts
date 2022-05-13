import {Entity, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import {PromocodeFields} from '../common/promocode.fields';
import {User} from '../../user/database/user.entity';

@Entity('promocodes')
export class Promocode extends PromocodeFields {
	@ManyToOne(() => User, (user) => user.promocodes)
	@JoinColumn({
		name: 'owner_id',
	})
	owner: User;
}