import { Bet } from './../bets/entities/bet.entity';
import { Game } from './entities/game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesResolver } from './games.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Bet])],
  providers: [GamesResolver, GamesService]
})
export class GamesModule {}
