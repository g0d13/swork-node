import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from '../categories/categories.service';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { Log } from './entities/log.entity';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log)
    private logsRepository: Repository<Log>,
    private usersService: UsersService,
    private categoriesService: CategoriesService,
  ) {}

  create(createLogDto: CreateLogDto) {
    return this.logsRepository.save(createLogDto);
  }

  async setMechanic(logId: string, mechanicId: string) {
    const log = await this.logsRepository.findOne({ where: [{ id: logId }] });
    log.mechanic = null;
    await this.logsRepository.save(log);
    const mechanic = await this.usersService.findOne(mechanicId);

    log.mechanic = mechanic;
    return await this.logsRepository.save(log);
  }

  async setCategories(id: string, categoriesId: string[]) {
    const log = await this.logsRepository.findOne({ where: [{ id }] });
    const categories = await this.categoriesService.findByIds(categoriesId);
    log.categories = categories;
    return this.logsRepository.save(log);
  }

  findAll() {
    return this.logsRepository.find({ relations: ['categories', 'mechanic'] });
  }

  findWithDeleted() {
    return this.logsRepository.find({
      select: ['name', 'createdAt', 'deletedAt', 'id'],
      withDeleted: true,
      order: { createdAt: 'ASC' },
    });
  }

  findOne(id: string) {
    return this.logsRepository.findOne({
      where: [{ id }],
      relations: ['categories', 'mechanic'],
      withDeleted: true,
    });
  }

  update(id: string, updateLogDto: UpdateLogDto) {
    return this.logsRepository.save({ id, ...updateLogDto });
  }

  remove(id: string) {
    return this.logsRepository.softRemove({ id });
  }
}
