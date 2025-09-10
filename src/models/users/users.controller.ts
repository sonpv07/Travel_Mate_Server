// src/models/users/users.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { JwtAccessTokenGuard } from 'src/authentication/guard/jwt-access-token.guard';
import { IUserRequest, IUserResponse } from './interfaces/user.interface';
import { IApiResponse } from 'src/common/interfaces/api-response.interface';

@Controller('users')
@UseGuards(JwtAccessTokenGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<IUserResponse[]> {
    return this.userService.findAll();
  }

  @Get('/profile')
  async getUserProfile(
    @Req() request: IUserRequest,
  ): Promise<IApiResponse<IUserResponse>> {
    const { user } = request;
    return {
      result: await this.userService.getUserProfile(user.id),
      message: 'Get profile successfully',
      success: true,
    };
  }

  //   @Post()
  //   async create(@Body() createUserDto: CreateUserDto): Promise<UserSerializer> {
  //     const user = await this.usersService.create(createUserDto);
  //     return new UserSerializer(user);
  //   }
}
