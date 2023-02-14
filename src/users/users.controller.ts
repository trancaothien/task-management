import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  get() {
    return {};
  }

  @Put('me')
  update(@Body() updateUserDTO: UpdateUserDTO) {
    return updateUserDTO;
  }
}
