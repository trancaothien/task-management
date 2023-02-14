import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    example: 'Nguyen Van',
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'A',
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: '123123@A',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'email@gmail.com',
  })
  @IsEmail()
  email: string;
}
