import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AppService } from './app.service'
import { AuthService } from './auth/auth.service'
import { JWTAuthGuard } from './auth/guards/JWTAuth.guard'
import { LocalAuthGuard } from './auth/guards/local-auth.guard'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get()
  healthCheck() {
    return this.appService.returnOk()
  }

  @UseGuards(JWTAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
