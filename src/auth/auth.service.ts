import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { LoginUserDTO } from 'src/user/DTO/LoginUser.dto'
import { User } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'
import * as bcrypt from 'bcrypt'

const saltRounds = 10

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email)
    if (user) {
      const same = await bcrypt.compare(password, user.encrypted)
      if (same) return user
    }

    return undefined
  }

  async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt(saltRounds)
    const encrypted = await bcrypt.hash(password, salt)

    return encrypted
  }

  async login(user: User) {
    const payload = { id: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
