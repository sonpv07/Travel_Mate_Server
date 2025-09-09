import { IUserResponse } from 'src/models/users/interfaces/user.interface';

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: IUserResponse;
}
