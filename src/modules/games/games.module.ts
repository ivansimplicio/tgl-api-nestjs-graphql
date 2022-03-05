import { Game } from './entities/game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesResolver } from './games.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  providers: [GamesResolver, GamesService]
})
export class GamesModule {}
