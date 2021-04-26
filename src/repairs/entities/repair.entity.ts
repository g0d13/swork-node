import { User } from 'src/users/entities/user.entity';
import { EntityWithData } from 'src/utils/EntityWithData';
import { Scale } from 'src/utils/Scale.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Request } from 'src/requests/entities/request.entity';

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
