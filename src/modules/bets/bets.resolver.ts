import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BetsService } from './bets.service';
import { Bet } from './entities/bet.entity';
import { CreateBetInput } from './dto/create-bet.input';

@Resolver(() => Bet)
export class BetsResolver {
  constructor(private readonly betsService: BetsService) {}

  @Mutation(() => [Bet])
  async createBet(@Args('bets', { type: () => [CreateBetInput] }) bets: CreateBetInput[]): Promise<Bet[]> {
    return await this.betsService.create(bets);
  }

  @Query(() => [Bet], { name: 'bets' })
  async findAll(): Promise<Bet[]> {
    return await this.betsService.findAll();
  }

  @Query(() => Bet, { name: 'bet' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.betsService.findOne(id);
  }
}