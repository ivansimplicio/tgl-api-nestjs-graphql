import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty.'})
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'This field cannot be empty.'})
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty({ message: 'This field cannot be empty.'})
  password: string;
}
