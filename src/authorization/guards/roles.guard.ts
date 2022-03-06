import { User } from './../../modules/users/entities/user.entity';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../common/roles.decorator';
import { Role } from '../common/roles.enum';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<Role[]>(ROLES_KEY,
      context.getHandler(),
    );
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    if (!req.user) return true;
    const roles = this.getUserRoles(req.user);
    if (!(roles.includes(requiredRoles[0]))) {
      throw new UnauthorizedException('Access denied.');
    }
    return true;
  }

  private getUserRoles(user: User): String[] {
    return user.roles.map((elem) => {
      return elem.role.role;
    })
  }
}