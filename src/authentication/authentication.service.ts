import { AuthType } from './dto/auth.type';
import { AuthInput } from './dto/auth.input';
import { User } from './../modules/users/entities/user.entity';
import { UsersService } from './../modules/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: AuthInput): Promise<AuthType> {
    const user = await this.usersService.findOneByEmail(data.email);
    const validPassword = bcrypt.compareSync(
      data.password,
      user.password,
    );
    if (!validPassword) {
      throw new UnauthorizedException('Incorrect password.');
    }
    const token = await this.jwtToken(user);
    return {
      user,
      token,
      roles: this.getUserRoles(user)
    };
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = {
      email: user.email,
      id: user.id,
      roles: this.getUserRoles(user)
    };
    return this.jwtService.signAsync(payload);
  }

  private getUserRoles(user: User): String[] {
    return user.roles.map((elem) => {
      return elem.role.role;
    })
  }
}
