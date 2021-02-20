import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from '../auth/auth.service'
import { LocalAuthGuard } from '../auth/guards/local-auth.guard'
import { RegisterUserDTO } from './DTO/RegisterUser.dto'
import { User } from './entities/user.entity'
import { UserService } from './user.service'
import express from 'express'
import { LoginUserDTO } from './DTO/LoginUser.dto'
import { JWTAuthGuard } from '../auth/guards/JWTAuth.guard'

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  async registerUser(@Body() { email, password }: RegisterUserDTO) {
    const success = await this.userService.create(email, password)
    if (success) return 'ok'
    else throw new BadRequestException()
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Body() body: LoginUserDTO,
    @Request() req: any,
    @Response({ passthrough: true }) res: express.Response,
  ) {
    const result = await this.authService.login(req.user)
    return {
      bundles: result.bundles,
      email: result.email,
      id: result.id,
      name: result.name,
      access_token: result.access_token,
    } as Partial<User>
  }

  @UseGuards(JWTAuthGuard)
  @Get('/test')
  ping() {
    return 'ok'
  }
}
