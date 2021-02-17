import 'reflect-metadata'
import { Test, TestingModule } from '@nestjs/testing'
import { BundleRepository } from './bundle.repository'
import { BundleService } from './bundle.service'
import { CardRepository } from './card.repository'

describe('BundleService', () => {
  let service: BundleService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BundleService, BundleRepository, CardRepository],
    }).compile()

    service = module.get<BundleService>(BundleService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
