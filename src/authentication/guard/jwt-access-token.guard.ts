import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAccessTokenGuard extends AuthGuard('jwt') {
  handleRequest(error, user) {
    if (error || !user) {
      throw new UnauthorizedException(
        "You don't have permission to use this API!",
      );
    }
    return user;
  }
}
