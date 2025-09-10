import { BadRequestException, Injectable } from '@nestjs/common';
import { UserSerializer } from './serializers/user.serializer';
import { User } from './entities/user.entity';
import { BaseService } from 'src/common/base.service';
import { UserRepository } from './users.repository';
import { Repository } from 'typeorm';
import { GetAuthenticatedDto } from './dto/get-authenticated.dto';
import { IUserResponse } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { UpdateUserProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService extends BaseService<User, Repository<User>> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository.getRepository());
  }

  async findUserByEmail(email: string): Promise<IUserResponse> {
    const user = await this.userRepository.findByEmail(email);
    return user ? new UserSerializer(user) : null;
  }

  async getAuthenticatedUser(
    getAuthenticatedDto: GetAuthenticatedDto,
  ): Promise<IUserResponse> {
    const { email, password } = getAuthenticatedDto;

    //* Check user existed
    const existedUser = await this.userRepository.findByEmail(email);

    if (!existedUser) throw new BadRequestException('User not existed');

    // console.log(existedUser.password, password);

    //* check password correct
    const is_matching = await bcrypt.compare(password, existedUser.password);

    if (!is_matching) throw new BadRequestException('Token not matching');

    return existedUser ? new UserSerializer(existedUser) : null;
  }

  async getUserProfile(userId: string): Promise<IUserResponse> {
    const user = await this.findById(userId);
    return new UserSerializer(user);
  }

  async updateUserProfile(
    userId: string,
    updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<IUserResponse> {
    const user = await this.update(userId, updateUserProfileDto);
    return new UserSerializer(user);
  }
}
