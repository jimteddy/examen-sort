import { IsEmail, Length, IsNotEmpty, IsString } from "class-validator"


export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  readonly username : string;
  
  @IsNotEmpty()
  @IsEmail()
  readonly email : string;
  
  @Length(8, 150)
  @IsNotEmpty()
  readonly password : string;
}
