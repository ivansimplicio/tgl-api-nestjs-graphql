import { User } from './../users/entities/user.entity';
import { GetAuthenticatedUser } from './../../utils/GetAuthenticationUser.decorator';
import { RolesGuard } from './../../authorization/guards/roles.guard';

import { GqlAuthGuard } from './../../authentication/guards/auth.guard';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BetsService } from './bets.service';
import { Bet } from './entities/bet.entity';
import { CreateBetInput } from './dto/create-bet.input';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/authorization/common/roles.decorator';
import { Role } from 'src/authorization/common/roles.enum';

@Resolver(() => Bet)
export class BetsResolver {
  constructor(private readonly betsService: BetsService) {}

  @Roles(Role.PLAYER)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => [Bet])
  async createBet(
    @Args('bets', { type: () => [CreateBetInput] }) bets: CreateBetInput[],
    @GetAuthenticatedUser() user: User
  ): Promise<Bet[]> {
    return await this.betsService.create(user, bets);
  }

  @Roles(Role.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Query(() => [Bet], { name: 'bets' })
  async findAll(): Promise<Bet[]> {
    return await this.betsService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Bet, { name: 'bet' })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
    @GetAuthenticatedUser() user: User
  ): Promise<Bet> {
    return await this.betsService.findOne(user, id);
  }
}