import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepository) {}

  async create(email: string, encrypted: string) {
    const user = this.usersRepository.create({
      email,
      encrypted,
    })

    await this.usersRepository.save(user)
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id)
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
    })
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id)
  }
}
