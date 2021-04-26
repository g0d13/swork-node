import { ApiProperty } from '@nestjs/swagger';

export class CreateLogDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  details: string;
}
