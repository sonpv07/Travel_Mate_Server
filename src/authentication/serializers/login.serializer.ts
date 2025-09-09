import { Expose } from 'class-transformer';
import { IUserResponse } from 'src/models/users/interfaces/user.interface';

export class LoginSerializer {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;

  @Expose()
  user: IUserResponse;

  constructor(partial: Partial<LoginSerializer>) {
    Object.assign(this, partial);
  }
}
