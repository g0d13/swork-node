import { forwardRef, Module } from '@nestjs/common';
import { RepairsService } from './repairs.service';
import { RepairsController } from './repairs.controller';
import { Repair } from './entities/repair.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { RequestsModule } from '../requests/requests.module';

@Module({
  imports: [
    UsersModule,
    forwardRef(() => RequestsModule),
    TypeOrmModule.forFeature([Repair]),
  ],
  controllers: [RepairsController],
  providers: [RepairsService],
  exports: [RepairsService],
})
export class RepairsModule {}
