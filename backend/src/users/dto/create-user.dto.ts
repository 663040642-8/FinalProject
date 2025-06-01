import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

//For admin use only
export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(4)
  password: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}