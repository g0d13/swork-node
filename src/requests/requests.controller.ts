import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { NotifyGateway } from '../notify/notify.gateway';
import { LogsService } from '../logs/logs.service';

@ApiTags('Request')
@Controller('request')
export class RequestsController {
  constructor(
    private readonly requestsService: RequestsService,
    private readonly logService: LogsService,
    private notifyGateway: NotifyGateway,
  ) {}

  @Post('new/:logId')
  @UseGuards(AuthGuard('jwt'))
  async createRequest(
    @Req() req: any,
    @Param('logId') logId: any,
    @Body() createRequest: CreateRequestDto,
  ) {
    const supervisor = req.user.id;
    const mechanic = await this.logService.findOne(logId);
    const mechanicId = mechanic.mechanic.id;
    await this.notifyGateway.sendNotifyToMechanic(mechanicId, 'hola');
    return this.requestsService.create(logId, supervisor, createRequest);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getMechanicRequest(@Req() req: any) {
    console.log('request list');
    return this.requestsService.findRequestUser(req.user);
  }

  @Get('history/:log')
  getRequestWithRepair(@Param('log') logId: any) {
    return this.requestsService.findRequestWithRepair(logId);
  }
  @Get('test')
  makeTest() {
    return this.notifyGateway.sendNotifyToMechanic(
      '1b78f9cb-4cb9-4785-ab5c-80cdc2b0a248',
      'hola',
    );
  }
}
