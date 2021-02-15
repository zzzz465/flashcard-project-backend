import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { UserRepository } from './user.repository'
import crypto from 'crypto'
import * as bcrypt from 'bcrypt'

const saltRounds = 10
const pw = 'rand_password'

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepository) {}

  async create(id: string, email?: string, password?: string) {
    let encrypted: string
    if (password) {
      const salt = await bcrypt.genSalt(saltRounds)
      encrypted = await bcrypt.hash(password, salt)
    } else {
      encrypted = new Uint8Array(crypto.randomBytes(48)).toString()
    }

    const user = this.usersRepository.create({
      id, email, encrypted
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
