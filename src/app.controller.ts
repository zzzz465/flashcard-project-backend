import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AppService } from './app.service'
import { AuthService } from './auth/auth.service'
import { JWTAuthGuard } from './auth/guards/JWTAuth.guard'
import { LocalAuthGard } from './auth/guards/local-auth.guard'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  healthCheck() {
    return this.appService.returnOk()
  }

  @UseGuards(LocalAuthGard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(JWTAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
