import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserRepository } from './repositories/user.repository';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createOne(createUserDto: CreateUserDTO): Promise<boolean> {
    const user = await this.userRepository.createOne(createUserDto);
    if (!user) return false;
    return true;
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneByEmail(email);
  }

  async findOneById(id: string) {
    return {
      id: id,
    };
  }
}
