import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createPlayer(@Args('data') data: CreateUserInput): Promise<User> {
    return await this.usersService.createPlayer(data);
  }

  @Mutation(() => User)
  async createAdmin(@Args('data') data: CreateUserInput): Promise<User> {
    return await this.usersService.createAdmin(data);
  }

  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async updateUser(@Args('id') id: number, @Args('data') data: UpdateUserInput): Promise<User> {
    return await this.usersService.update(id, data);
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id', { type: () => Int }) id: number): Promise<Boolean> {
    return await this.usersService.remove(id);
  }
}
