import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/user/user.entity'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email)
    const encrypted = password
    if (user && user.encrypted === encrypted) return user
    else return undefined
  }

  async login(user: User) {
    const payload = { id: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
