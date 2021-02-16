import { IsEmail, IsString } from "class-validator";

/**
 * Register User via email and password authentication
 */
export class RegisterUserDTO {
  @IsEmail()
  email: string
  @IsString()
  password: string
}