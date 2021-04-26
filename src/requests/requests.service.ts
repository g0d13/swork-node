import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from '../logs/logs.service';
import { MachinesService } from '../machines/machines.service';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { Request as Rq } from './entities/request.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Rq)
    private requestRepository: Repository<Rq>,
    private usersService: UsersService,
    private logService: LogsService,
    private machineService: MachinesService,
  ) {}

  async create(
    logId: string,
    supervisorId: string,
    createRequestDto: CreateRequestDto,
  ) {
    const machine = await this.machineService.findOne(
      createRequestDto.machineId,
    );
    const supervisor = await this.usersService.findOne(supervisorId);
    const log = await this.logService.findOne(logId);
    const request = this.requestRepository.create(createRequestDto);
    request.machine = machine;
    request.supervisor = supervisor;
    request.log = log;

    return this.requestRepository.save(request);
  }

  findAll() {
    return this.requestRepository.find();
  }
  'a3870995-b572-4840-a76c-56b930962e76';
  async findRequestUser({ id }) {
    console.log(id);
    const reqList = await this.requestRepository.query(
      `SELECT public.request.*, r."isFixed", request."id" as requestId, l."mechanicId"
      FROM public.request
      INNER JOIN log l on l.id = request."logId"
      LEFT JOIN repair r on request.id = r."requestId"
      inner join "user" u on u.id =l."mechanicId"
      where l."mechanicId"='${id}' 
      AND r."isFixed" IS null OR r."isFixed"=false`,
    );
    console.log(reqList);
    return reqList;
  }

  findOne(id: string) {
    return this.requestRepository.findOne({ where: [{ id }] });
  }
  //SELECT * FROM request LEFT JOIN repair r on request.id = r."requestId"
  //SELECT user.* FROM users user
  //     INNER JOIN photos photo ON photo.user = user.id
  findRequestWithRepair(logId: string) {
    const response = this.requestRepository
      .createQueryBuilder('request')
      .leftJoinAndMapOne('request.repair', 'repair', 'repair')
      .where('request.logId = :logId', { logId })
      .getMany();

    return response;
  }
}
