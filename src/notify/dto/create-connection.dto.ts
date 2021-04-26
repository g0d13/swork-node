import { ApiProperty } from '@nestjs/swagger';

export class AddConnectionDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  connectionId: string;
}
