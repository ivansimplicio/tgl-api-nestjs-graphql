import { User } from './../../modules/users/entities/user.entity';

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthType {
  @Field(() => User)
  user: User;

  @Field()
  token: string;

  @Field(() => [String])
  roles: String[];
}