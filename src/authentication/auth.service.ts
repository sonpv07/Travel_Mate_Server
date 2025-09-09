import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/models/users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/models/users/interfaces/user.interface';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { ILoginResponse } from './interfaces/login.interface';
import { UserSerializer } from 'src/models/users/serializers/user.serializer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignUpDto): Promise<string> {
    const { email, name, password, repeatPassword } = signupDto;

    //* check email existed
    const existedUser = await this.userService.findUserByEmail(email);

    if (existedUser)
      throw new BadRequestException('This email is already in used');

    //* Check password matches repeat password
    if (repeatPassword !== password)
      throw new BadRequestException('Password not matches');

    //* encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    //* create new user
    const newUserData = { email, name, password: hashedPassword };
    const newUser = await this.userService.store(newUserData);

    if (newUser) return 'Sign Up successfully';
    return 'Sign Up failed';
  }

  async login(user: IUser): Promise<ILoginResponse> {
    const payload: IJwtPayload = {
      email: user.email,
      sub: user.id,
    };

    // console.log('>>>>>>USER', user);

    const accessToken = this.generateTokenHelper(
      payload,
      this.configService.get<string>('ACCESS_TOKEN_SECRET_KEY'),
      this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    );

    const refreshToken = this.generateTokenHelper(
      payload,
      this.configService.get<string>('REFRESH_TOKEN_SECRET_KEY'),
      this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    );

    // await this.storeRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: new UserSerializer(user),
    };
  }

  generateTokenHelper(payload: IJwtPayload, key: string, expiresTime: string) {
    return this.jwtService.sign(payload, {
      secret: key,
      expiresIn: `${expiresTime}s`,
    });
  }
}
