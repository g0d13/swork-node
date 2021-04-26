import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Role } from '../entities/role.enum';

export class CreateUserDto {
  @ApiProperty()
  @Length(2, 30)
  firstName: string;

  @ApiProperty()
  @Length(2, 30)
  lastName: string;

  @ApiProperty({ example: 'mail@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: Role })
  @IsNotEmpty()
  role: Role;
}
