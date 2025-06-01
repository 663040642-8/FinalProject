import { IsEmail, MinLength, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(4)
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
}