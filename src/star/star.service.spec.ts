import { Test, TestingModule } from '@nestjs/testing'
import { BundleRepository } from '../bundle/bundle.repository'
import { StarRepository } from './star.repository'
import { StarService } from './star.service'

describe('StarService', () => {
  let service: StarService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarService, StarRepository, BundleRepository],
    }).compile()

    service = module.get<StarService>(StarService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
