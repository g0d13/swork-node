import { EntityWithData } from '../../utils/EntityWithData';
import { User } from '../../users/entities/user.entity';
import { Entity } from 'typeorm';

@Entity()
export class Notify extends EntityWithData {
  userFrom: User;
  userTo: User;
  title: string;
  body: string;
  clients: string[];
}
