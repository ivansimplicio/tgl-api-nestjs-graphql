import { Cart } from './../cart/entities/cart.entity';
import { CartService } from './../cart/cart.service';
import { Bet } from './../bets/entities/bet.entity';
import { Game } from './entities/game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesResolver } from './games.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Bet, Cart])],
  providers: [GamesResolver, GamesService, CartService]
})
export class GamesModule {}
