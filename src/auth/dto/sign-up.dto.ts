import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Nguyen Van' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'A' })
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Abd123456' })
  password: string;
}
