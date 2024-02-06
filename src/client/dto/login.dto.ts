import { IsEmail, Length, IsNotEmpty } from "class-validator"

export class LoginDto{
  
  @IsNotEmpty()
  @IsEmail()
  readonly email : string;

  @IsNotEmpty()
  @Length(8, 150)
  readonly password : string;
}