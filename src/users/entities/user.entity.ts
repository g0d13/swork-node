import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { EntityWithData } from '../../utils/EntityWithData';
import { Role } from './role.enum';
import { Log } from 'src/logs/entities/log.entity';

@Entity()
export class User extends EntityWithData {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ select: false })
  password: string;

  @Column({ unique: true })
  email: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = bcrypt.hashSync(this.password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compareSync(password, this.password);
  }

  @Column()
  role: Role;

  @OneToOne(() => Log, (log) => log.mechanic)
  log?: Log;
}
