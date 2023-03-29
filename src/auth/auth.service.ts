import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  genaratePassword,
  hashMatching,
  hashPassword,
} from 'src/common/utility/hash.utility';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { SignUpDTO } from './dto/sign-up.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { Message } from 'src/common/constants/messages';

export interface JWTPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDocument | null> {
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      const isPasswordMatched = await hashMatching(password, user.password);
      return isPasswordMatched ? user : null;
    }
    throw new UnauthorizedException(Message.UNAUTHORIZED);
  }

  async createNewUser(createDTO: SignUpDTO): Promise<boolean> {
    const createUserDto: CreateUserDTO = {
      firstName: createDTO.firstName,
      lastName: createDTO.lastName,
      email: createDTO.email,
      password: await hashPassword(createDTO.password),
    };
    return await this.userService.createOne(createUserDto);
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new BadRequestException(Message.ACCOUNT_DOES_NOT_EXIST);
    const isHash = await hashMatching(password, user.password);
    if (!isHash) throw new BadRequestException(Message.WRONG_PASSWORD);
    const payload: JWTPayload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      ...payload,
    };
  }

  async changePassword(
    dto: ChangePasswordDTO,
    userId: string,
  ): Promise<boolean> {
    const user = await this.userService.findOneById(userId);

    const isHash = await hashMatching(dto.currentPassword, user.password);
    if (!isHash) throw new BadRequestException(Message.PASSWORD_INCORRECT);
    user.password = await hashPassword(dto.newPassword);
    return await this.userService.updateUser(user);
  }
}
