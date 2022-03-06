import { IsArray, IsNumber, IsNotEmpty } from 'class-validator';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateBetInput {
  
  @IsNotEmpty({ message: 'This field cannot be empty.'})
  @IsNumber()
  gameId: number;

  @IsNotEmpty({ message: 'This field cannot be empty.'})
  @IsArray()
  chosenNumbers: number[];
}
