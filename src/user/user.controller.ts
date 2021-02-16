import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard'
import { RegisterUserDTO } from './DTO/RegisterUser.dto'
import { User } from './entities/user.entity'
import { UserService } from './user.service'
import express from 'express'
import { LoginUserDTO } from './DTO/LoginUser.dto'
import { JWTAuthGuard } from 'src/auth/guards/JWTAuth.guard'

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  async registerUser(@Body() { email, password }: RegisterUserDTO) {
    await this.userService.create(email, password)
    return 'ok'
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Body() body: LoginUserDTO,
    @Request() req: any,
    @Response({ passthrough: true }) res: express.Response,
  ) {
    const { access_token } = await this.authService.login(req.user)
    return {
      access_token,
    }
  }

  @UseGuards(JWTAuthGuard)
  @Get('/test')
  ping() {
    return 'ok'
  }
}
