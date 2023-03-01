import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AccountScope } from 'src/common/decorators/account.decorator';
import { AuthService } from './auth.service';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

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
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(@AccountScope() user: any) {
    console.log(user);
    return this.authService.signIn(user);
  }

  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDTO: ForgotPasswordDTO) {
    return forgotPasswordDTO;
  }

  @Post('change-password')
  changePassword(@Body() changePasswordDTO: ChangePasswordDTO) {
    return changePasswordDTO;
  }
}
