import { IsEmail, IsString } from 'class-validator';

export class GetAuthenticatedDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
