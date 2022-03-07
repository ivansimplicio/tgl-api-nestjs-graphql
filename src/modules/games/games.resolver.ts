import { ListGames } from './dto/list-games.output';
import { RolesGuard } from './../../authorization/guards/roles.guard';
import { GqlAuthGuard } from './../../authentication/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GamesService } from './games.service';
import { Game } from './entities/game.entity';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Roles } from 'src/authorization/common/roles.decorator';
import { Role } from 'src/authorization/common/roles.enum';
import { Any } from 'typeorm';

@Resolver(() => Game)
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) {}

  @Roles(Role.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Game)
  async createGame(@Args('data') data: CreateGameInput): Promise<Game> {
    return await this.gamesService.create(data);
  }

  @Query(() => ListGames, { name: 'listGames' })
  async findAll() {
    return await this.gamesService.findAll();
  }

  @Query(() => Game, { name: 'game' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Game> {
    return await this.gamesService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Game)
  async updateGame(@Args('id') id: number, @Args('data') data: UpdateGameInput): Promise<Game> {
    return await this.gamesService.update(id, data);
  }

  @Roles(Role.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Boolean)
  async removeGame(@Args('id', { type: () => Int }) id: number): Promise<Boolean> {
    return await this.gamesService.remove(id);
  }
}
