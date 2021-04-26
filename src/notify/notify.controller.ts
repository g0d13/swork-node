import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddConnectionDto } from './dto/create-connection.dto';
import { NotifyService } from './notify.service';

@ApiTags('Notify')
@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Get('connect')
  createConnection() {}

  @Post()
  create(@Body() createConnection: AddConnectionDto) {
    return this.notifyService.create(createConnection);
  }
}
