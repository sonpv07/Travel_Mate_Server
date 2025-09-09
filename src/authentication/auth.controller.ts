import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { IApiResponse } from 'src/common/interfaces/api-response.interface';
import { LocalAuthGuard } from './guard/local.guard';
import { IUserRequest } from 'src/models/users/interfaces/user.interface';
import { ILoginResponse } from './interfaces/login.interface';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDTO: SignUpDto): Promise<IApiResponse<string>> {
    const message = await this.authService.signup(signUpDTO);

    return {
      message: message,
      result: message,
      success: true,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(
    @Req() request: IUserRequest,
  ): Promise<IApiResponse<ILoginResponse>> {
    return {
      message: 'Login successfully',
      result: await this.authService.login(request.user),
      success: true,
    };
  }
}
