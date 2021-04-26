import { User } from '../../users/entities/user.entity';
import { EntityWithData } from '../../utils/EntityWithData';
import { Scale } from '../../utils/Scale.enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Request } from '../../requests/entities/request.entity';

@Entity()
export class Repair extends EntityWithData {
  @Column()
  isFixed: boolean;

  @Column()
  details: string;

  @Column({ type: 'enum', enum: Scale })
  severity: Scale;

  @Column({ type: 'date' })
  arrivalTime: Date;

  @Column({ type: 'date' })
  departureTime: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  mechanic: User;

  @ManyToOne(() => Request)
  @JoinColumn()
  request: Request;
}
