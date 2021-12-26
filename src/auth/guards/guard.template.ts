import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserRoles } from '../../utility/types';

@Injectable()
export class TemplateAuthGuard extends AuthGuard('jwt') {
  constructor(private userRoles: UserRoles[]) {
    super();
  }

  handleRequest(err, user) {
    if (err || !user || !this.userRoles.includes(user.role)) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
