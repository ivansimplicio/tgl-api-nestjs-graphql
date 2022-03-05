import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateGameInput {
  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty.'})
  type: string;

  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty.'})
  description: string;

  @IsNumber()
  @IsNotEmpty({ message: 'This field cannot be empty.'})
  range: number;

  @IsNumber()
  @IsNotEmpty({ message: 'This field cannot be empty.'})
  price: number;

  @IsNumber()
  @IsNotEmpty({ message: 'This field cannot be empty.'})
  maxNumber: number;

  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty.'})
  color: string;
}