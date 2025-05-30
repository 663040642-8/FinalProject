import { IsEmail, MinLength, IsNotEmpty } from "class-validator";

export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(4)
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}