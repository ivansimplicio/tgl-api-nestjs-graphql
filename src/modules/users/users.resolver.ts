import { GetAuthenticatedUser } from './../../utils/GetAuthenticationUser.decorator';
import { RolesGuard } from './../../authorization/guards/roles.guard';
import { GqlAuthGuard } from './../../authentication/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Roles } from 'src/authorization/common/roles.decorator';
import { Role } from 'src/authorization/common/roles.enum';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createPlayer(@Args('data') data: CreateUserInput): Promise<User> {
    return await this.usersService.createPlayer(data);
  }

  @Roles(Role.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => User)
  async createAdmin(@Args('data') data: CreateUserInput): Promise<User> {
    return await this.usersService.createAdmin(data);
  }

  @Roles(Role.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
    @GetAuthenticatedUser() user: User,
  ): Promise<User> {
    return await this.usersService.findOne(user, id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('id') id: number, @Args('data') data: UpdateUserInput,
    @GetAuthenticatedUser() user: User
  ): Promise<User> {
    return await this.usersService.update(user, id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async removeUser(
    @Args('id', { type: () => Int }) id: number,
    @GetAuthenticatedUser() user: User
  ): Promise<Boolean> {
    return await this.usersService.remove(user, id);
  }
}
