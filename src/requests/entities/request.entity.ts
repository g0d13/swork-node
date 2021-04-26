import { Log } from 'src/logs/entities/log.entity';
import { Machine } from 'src/machines/entities/machine.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityWithData } from 'src/utils/EntityWithData';
import { Scale } from 'src/utils/Scale.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class Request extends EntityWithData {
  @Column()
  description: string;

  @Column()
  priority: Scale;

  @Column()
  problemCode: string;

  @ManyToOne(() => User)
  @JoinColumn()
  supervisor: User;

  @ManyToOne(() => Machine)
  @JoinColumn()
  machine: Machine;

  @ManyToOne(() => Log, (log) => log.request)
  log: Log;
}
