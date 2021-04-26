import { EntityWithData } from '../../utils/EntityWithData';
import { Column, Entity } from 'typeorm';

@Entity()
export class Machine extends EntityWithData {
  @Column()
  identifier: string;
  @Column()
  model: string;
  @Column()
  brand: string;
}
