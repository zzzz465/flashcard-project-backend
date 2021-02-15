import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDTO {
  @IsEmail()
  @ApiProperty()
  readonly email: string

  @IsNotEmpty()
  @ApiProperty()
  readonly password: string
}
