import { ObjectType, Field } from '@nestjs/graphql';
import { Game } from './../entities/game.entity';

@ObjectType()
export class ListGames {

  @Field()
  minCartValue: number;

  @Field(() => [Game])
  games: Game[];
}