import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDTO {
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  readonly password: string
}
