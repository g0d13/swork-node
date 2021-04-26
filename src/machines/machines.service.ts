import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { Machine } from './entities/machine.entity';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine)
    private machinesRepository: Repository<Machine>,
  ) {}

  create(createMachineDto: CreateMachineDto) {
    return this.machinesRepository.save(createMachineDto);
  }

  findAll() {
    return this.machinesRepository.find();
  }

  findOne(id: string) {
    return this.machinesRepository.findOne({ id });
  }

  update(id: string, updateMachineDto: UpdateMachineDto) {
    return this.machinesRepository.save({
      id,
      ...updateMachineDto,
    });
  }

  remove(id: string) {
    return this.machinesRepository.softDelete({ id });
  }
}
