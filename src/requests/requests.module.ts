import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { UsersModule } from '../users/users.module';
import { LogsModule } from '../logs/logs.module';
import { MachinesModule } from '../machines/machines.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [
    LogsModule,
    NotifyModule,
    UsersModule,
    LogsModule,
    MachinesModule,
    TypeOrmModule.forFeature([Request]),
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
  exports: [RequestsService],
})
export class RequestsModule {}
