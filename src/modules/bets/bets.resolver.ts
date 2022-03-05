import { GqlAuthGuard } from './../../authentication/guards/auth.guard';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BetsService } from './bets.service';
import { Bet } from './entities/bet.entity';
import { CreateBetInput } from './dto/create-bet.input';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Bet)
export class BetsResolver {
  constructor(private readonly betsService: BetsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [Bet])
  async createBet(@Args('bets', { type: () => [CreateBetInput] }) bets: CreateBetInput[]): Promise<Bet[]> {
    return await this.betsService.create(bets);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Bet], { name: 'bets' })
  async findAll(): Promise<Bet[]> {
    return await this.betsService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Bet, { name: 'bet' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.betsService.findOne(id);
  }
}