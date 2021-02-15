import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserController } from './user.controller'
import { User } from './user.entity'
import { UserModule } from './user.module'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'

describe('UserService', () => {
  let userService: UserService
  let userRepository: UserRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository],
    }).compile()

    userService = module.get<UserService>(UserService)
    userRepository = module.get<UserRepository>(UserRepository)
  })

  it('should be defined', () => {
    expect(userService).toBeDefined()
  })
})
