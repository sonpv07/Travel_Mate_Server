import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { VALIDATION_MESSAGES } from 'src/common/constants/validation.messages';

export class SignUpDto {
  @IsEmail({}, { message: VALIDATION_MESSAGES.EMAIL_INVALID })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.EMAIL_IS_NOT_EMPTY })
  email: string;

  @IsStrongPassword({}, { message: VALIDATION_MESSAGES.PASSWORD_WEAK })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.PASSWORD_IS_NOT_EMPTY })
  password: string;

  @IsStrongPassword()
  @IsNotEmpty({ message: VALIDATION_MESSAGES.PASSWORD_REPEAT_NOT_EMPTY })
  repeatPassword: string;

  @IsString()
  @MinLength(3, { message: VALIDATION_MESSAGES.MIN_LENGTH_NAME(3) })
  name: string;
}
