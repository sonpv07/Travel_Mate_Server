import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/role.decorator';
import { IUserRequest } from 'src/models/users/interfaces/user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    const request: IUserRequest = context.switchToHttp().getRequest();
    const { user } = request;

    if (!roles || roles.length === 0) {
      return true;
    }

    return roles.some((role) => user.role.includes(role));
  }
}
