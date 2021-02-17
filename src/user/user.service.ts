import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { AuthService } from '../auth/auth.service'
import { User } from './entities/user.entity'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(
    private usersRepository: UserRepository,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async create(email: string, password: string) {
    const encrypted = await this.authService.encryptPassword(password)
    const user = this.usersRepository.create({
      email,
      encrypted,
    })

    await this.usersRepository.save(user)
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  findOne(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne(id)
  }

  findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { email },
    })
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id)
  }
}
