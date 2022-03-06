import { AuthInput } from './dto/auth.input';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthenticationService } from './authentication.service';
import { Authentication } from './entities/authentication.entity';
import { AuthType } from './dto/auth.type';

@Resolver(() => Authentication)
export class AuthenticationResolver {

  constructor(private readonly authService: AuthenticationService) {}

  @Mutation(() => AuthType)
  async login(@Args('data') data: AuthInput): Promise<AuthType> {
    const response = await this.authService.validateUser(data);
    return {
      user: response.user,
      token: response.token,
      roles: response.roles,
    };
  }
}
