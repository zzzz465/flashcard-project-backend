import { Test, TestingModule } from '@nestjs/testing'
import { UserModule } from '../user/user.module'
import { BundleController } from './bundle.controller'
import { BundleRepository } from './bundle.repository'
import { BundleService } from './bundle.service'
import { CardRepository } from './card.repository'
import { BundleAbilityFactory } from './casl-ability.factory'

describe('BundleController', () => {
  let controller: BundleController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BundleController],
      providers: [
        BundleService,
        BundleRepository,
        CardRepository,
        BundleAbilityFactory,
      ],
    }).compile()

    controller = module.get<BundleController>(BundleController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
