import { UserRoleEnum } from '../enums/user.enum';

export interface IUserResponse {
  id: string;
  email: string;
  avatar: string;
  name: string;
  role: UserRoleEnum;
}

export interface IUser {
  id: string;
  email: string;
  avatar: string;
  name: string;
  password: string;
  role: UserRoleEnum;
}

export interface IUserRequest extends Request {
  user: IUser;
}
