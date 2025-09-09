import { IsEmail, IsNotEmpty } from 'class-validator';
import { VALIDATION_MESSAGES } from 'src/common/constants/validation.messages';

export class LoginDto {
  @IsEmail({}, { message: VALIDATION_MESSAGES.EMAIL_INVALID })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.EMAIL_IS_NOT_EMPTY })
  email: string;

  @IsNotEmpty({ message: VALIDATION_MESSAGES.PASSWORD_IS_NOT_EMPTY })
  password: string;
}
