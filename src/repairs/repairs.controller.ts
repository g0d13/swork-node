import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Param,
} from '@nestjs/common';
import { RepairsService } from './repairs.service';
import { CreateRepairDto } from './dto/create-repair.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Request')
@Controller('repair')
export class RepairsController {
  constructor(private readonly repairsService: RepairsService) {}

  @Post(':requestId')
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createRepairDto: CreateRepairDto,
    @Req() req: any,
    @Param('requestId') requestId: any,
  ) {
    const mechanic = req.user.id;
    return this.repairsService.create(requestId, mechanic, createRepairDto);
  }
}
