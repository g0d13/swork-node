import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../users/entities/user.entity';
import { EntityWithData } from '../../utils/EntityWithData';
import { Request as Rq } from '../../requests/entities/request.entity';

@Entity()
export class Log extends EntityWithData {
  @Column()
  name: string;

  @Column()
  details: string;

  @ManyToOne(() => User, (user) => user.log, { onDelete: 'SET NULL' })
  @JoinColumn()
  mechanic?: User;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  //User can have multiple photos, but each photo is owned by only one single user.
  //Log puede tener muchas solicitudes pero cada solicitud pertence a un solo log
  @OneToMany(() => Rq, (rq) => rq.log)
  request: Rq[];
}
