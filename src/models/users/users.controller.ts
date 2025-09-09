// src/models/users/users.controller.ts
import { Controller, Get } from '@nestjs/common';
import { UserSerializer } from './serializers/user.serializer';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserSerializer[]> {
    return this.userService.findAll();
  }

  //   @Post()
  //   async create(@Body() createUserDto: CreateUserDto): Promise<UserSerializer> {
  //     const user = await this.usersService.create(createUserDto);
  //     return new UserSerializer(user);
  //   }
}
