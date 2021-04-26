import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class DeviceClient {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  connectionId: string;
  @Column()
  userId: string;
}
