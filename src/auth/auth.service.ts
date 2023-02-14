import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UNAUTHORIZED } from 'src/common/constants/messages';
import { hashMatching, hashPassword } from 'src/common/utility/hash.utility';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { SignUpDTO } from './dto/sign-up.dto';

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

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      const isPasswordMatched = await hashMatching(password, user.password);
      return isPasswordMatched ? user : null;
    }
    throw new UnauthorizedException(UNAUTHORIZED);
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

  async signIn(user: User) {
    // const user = await this.userService.findOneByEmail(signInDTO.email);
    const payload: JWTPayload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      ...user,
    };
  }
}
