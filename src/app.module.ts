import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { LogsModule } from './logs/logs.module';
import { MachinesModule } from './machines/machines.module';
import { RequestsModule } from './requests/requests.module';
import { AuthModule } from './auth/auth.module';
import { RepairsModule } from './repairs/repairs.module';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    NotifyModule,
    UsersModule,
    CategoriesModule,
    LogsModule,
    MachinesModule,
    RequestsModule,
    AuthModule,
    RepairsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
