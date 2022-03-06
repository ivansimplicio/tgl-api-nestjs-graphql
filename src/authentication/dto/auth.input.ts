import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { InputType } from '@nestjs/graphql';

@InputType()
export class AuthInput {
  @IsEmail()
  @IsNotEmpty({ message: 'This field cannot be empty.'})
  email: string;

  @MinLength(8)
  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty.'})
  password: string;
}
