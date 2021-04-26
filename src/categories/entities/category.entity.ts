import { EntityWithData } from '../../utils/EntityWithData';
import { Column, Entity } from 'typeorm';

@Entity()
export class Category extends EntityWithData {
  @Column()
  name: string;

  @Column()
  details: string;
}
