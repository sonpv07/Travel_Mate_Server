// src/models/users/serializers/user.serializer.ts
import { Exclude, Expose } from 'class-transformer';
import { User } from '../entities/user.entity';
import { UserRoleEnum } from '../enums/user.enum';

export class UserSerializer {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  avatar: string;

  @Expose()
  name: string;

  @Expose()
  role: UserRoleEnum;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  public static fromEntities(users: User[]): UserSerializer[] {
    return users.map((user) => new UserSerializer(user));
  }
}
