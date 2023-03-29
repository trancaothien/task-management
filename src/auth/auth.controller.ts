import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AccountScope } from 'src/common/decorators/account.decorator';
import { AuthService } from './auth.service';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Sign } from 'crypto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() createDTO: SignUpDTO) {
    return this.authService.createNewUser(createDTO);
  }

  @ApiBody({
    type: SignInDTO,
  })
  @Post('sign-in')
  signIn(@Body() {email, password}: SignInDTO) {
    return this.authService.signIn(email, password);
  }

  @Post('forgot-password')
  @ApiBearerAuth('defaultBearerAuth')
  forgotPassword(@Body() forgotPasswordDTO: ForgotPasswordDTO) {
    return forgotPasswordDTO;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully forgot password.',
    type: Boolean,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth('defaultBearerAuth')
  @Patch('change-password')
  async changePassword(
    @Body() dto: ChangePasswordDTO,
    @AccountScope() user: any,
  ): Promise<boolean> {
    await this.authService.changePassword(dto, user.id);
    return true;
  }
}
