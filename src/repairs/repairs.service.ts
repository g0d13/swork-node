import { Injectable } from '@nestjs/common';
import { CreateRepairDto } from './dto/create-repair.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repair } from './entities/repair.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { RequestsService } from '../requests/requests.service';
import { log } from 'util';

@Injectable()
export class RepairsService {
  constructor(
    @InjectRepository(Repair) private repairRepository: Repository<Repair>,
    private usersService: UsersService,
    private requestsService: RequestsService,
  ) {}

  async create(
    requestId: string,
    mechanicId: string,
    createRepairDto: CreateRepairDto,
  ) {
    const mechanic = await this.usersService.findOne(mechanicId);
    const request = await this.requestsService.findOne(requestId);

    const repairToSave = await this.repairRepository.create({
      ...createRepairDto,
      departureTime: new Date(),
      mechanic,
      request,
    });
    console.log(repairToSave);
    return this.repairRepository.save(repairToSave);
  }

  findAll() {
    return `This action returns all repairs`;
  }

  async findWhereLog(logId: string) {
    return this.repairRepository.find({
      relations: ['request'],
      where: { 'request.log.id': logId },
    });
  }
}
