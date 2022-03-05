import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GamesService } from './games.service';
import { Game } from './entities/game.entity';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';

@Resolver(() => Game)
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) {}

  @Mutation(() => Game)
  async createGame(@Args('data') data: CreateGameInput): Promise<Game> {
    return await this.gamesService.create(data);
  }

  @Query(() => [Game], { name: 'games' })
  async findAll(): Promise<Game[]> {
    return await this.gamesService.findAll();
  }

  @Query(() => Game, { name: 'game' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Game> {
    return await this.gamesService.findOne(id);
  }

  @Mutation(() => Game)
  async updateGame(@Args('id') id: number, @Args('data') data: UpdateGameInput): Promise<Game> {
    return await this.gamesService.update(id, data);
  }

  @Mutation(() => Boolean)
  async removeGame(@Args('id', { type: () => Int }) id: number): Promise<Boolean> {
    return await this.gamesService.remove(id);
  }
}
