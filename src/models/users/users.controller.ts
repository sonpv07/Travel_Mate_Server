import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { IUserRequest, IUserResponse } from './interfaces/user.interface';
import { IApiResponse } from 'src/common/interfaces/api-response.interface';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRoleEnum } from './enums/user.enum';
import { RolesGuard } from 'src/common/guards/role.guard';
import { UpdateUserProfileDto } from './dto/update-profile.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles([UserRoleEnum.ADMIN])
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

  @Patch('/profile')
  async updateUserProfile(
    @Req() request: IUserRequest,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<IApiResponse<IUserResponse>> {
    const { user } = request;
    return {
      result: await this.userService.updateUserProfile(
        user.id,
        updateUserProfileDto,
      ),
      message: 'Update profile successfully',
      success: true,
    };
  }

  //   @Post()
  //   async create(@Body() createUserDto: CreateUserDto): Promise<UserSerializer> {
  //     const user = await this.usersService.create(createUserDto);
  //     return new UserSerializer(user);
  //   }
}
