import { CreateGameInput } from './create-game.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGameInput extends PartialType(CreateGameInput) {
}
