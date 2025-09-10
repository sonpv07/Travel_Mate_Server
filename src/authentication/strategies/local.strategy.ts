import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/models/users/users.service';
import { IUserResponse } from 'src/models/users/interfaces/user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({ usernameField: 'email' }); //* Default is username, change to email
  }

  async validate(email: string, password: string): Promise<IUserResponse> {
    const user: IUserResponse = await this.userService.getAuthenticatedUser({
      email,
      password,
    });

    console.log(user);
    return user;
  }
}
