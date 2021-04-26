import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Logs')
@Controller('log')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  create(@Body() createLogDto: CreateLogDto) {
    return this.logsService.create(createLogDto);
  }

  @Post(':logId/mechanic/:mechanicId')
  setMachine(
    @Param('logId') logId: string,
    @Param('mechanicId') mechanicId: string,
  ) {
    return this.logsService.setMechanic(logId, mechanicId);
  }

  @Post(':id/categories')
  setCategories(@Param('id') id: string, @Body() categories: string[]) {
    return this.logsService.setCategories(id, categories);
  }

  @Get()
  findAll() {
    return this.logsService.findAll();
  }

  @Get('/del')
  findWithDeleted() {
    return this.logsService.findWithDeleted();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLogDto: UpdateLogDto) {
    return this.logsService.update(id, updateLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logsService.remove(id);
  }
}
