import { ApiProperty } from '@nestjs/swagger';

export class CreateMachineDto {
  @ApiProperty()
  identifier: string;
  @ApiProperty()
  model: string;
  @ApiProperty()
  brand: string;
}
