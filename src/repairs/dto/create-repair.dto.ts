import { ApiProperty } from '@nestjs/swagger';
import { Scale } from 'src/utils/Scale.enum';

export class CreateRepairDto {
  @ApiProperty()
  isFixed: boolean;

  @ApiProperty()
  details: string;

  @ApiProperty()
  severity: Scale;

  @ApiProperty({ type: Date })
  arrivalTime: Date;

  @ApiProperty({ type: Date })
  departureTime: Date;
}
