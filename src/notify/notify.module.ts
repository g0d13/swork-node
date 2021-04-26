import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotifyGateway } from './notify.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notify } from './entities/notify.entity';
import { NotifyController } from './notify.controller';
import { DeviceClient } from './entities/device-client.entity';
import { NotifyService } from './notify.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Notify, DeviceClient]),
  ],
  controllers: [NotifyController],
  providers: [NotifyGateway, NotifyService],
  exports: [NotifyGateway],
})
export class NotifyModule {}
