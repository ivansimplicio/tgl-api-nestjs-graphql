import { Cart } from './../cart/entities/cart.entity';
import { Game } from './../games/entities/game.entity';
import { Bet } from './entities/bet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BetsService } from './bets.service';
import { BetsResolver } from './bets.resolver';
import { GamesService } from '../games/games.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bet, Game, Cart])],
  providers: [BetsResolver, BetsService, GamesService]
})
export class BetsModule {}
