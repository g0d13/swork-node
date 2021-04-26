import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notify } from './entities/notify.entity';
import { DeviceClient } from './entities/device-client.entity';
import { AddConnectionDto } from './dto/create-connection.dto';

@Injectable()
export class NotifyService {
  constructor(
    @InjectRepository(Notify) private notifyRepository: Repository<Notify>,
    @InjectRepository(DeviceClient)
    private deviceRepository: Repository<DeviceClient>,
  ) {}
  create(createConnection: AddConnectionDto) {
    this.deviceRepository.create({ ...createConnection });
  }

  addConnection(createConnection: AddConnectionDto) {
    const connection = this.deviceRepository.create({ ...createConnection });
    this.deviceRepository.save(connection);
  }
  findUserConnections(userId: string) {
    return this.deviceRepository.find({ where: { userId } });
  }

  async removeConnection(connectionId: string) {
    return await this.deviceRepository.delete({ connectionId });
  }

  async removeAllConnections() {
    return this.deviceRepository.clear();
  }

  getOnlineUsers() {
    return this.deviceRepository.find();
  }
}
