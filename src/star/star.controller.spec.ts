import { Test, TestingModule } from '@nestjs/testing'
import { BundleRepository } from '../bundle/bundle.repository'
import { StarController } from './star.controller'
import { StarRepository } from './star.repository'
import { StarService } from './star.service'

describe('StarController', () => {
  let controller: StarController
  let service: StarService
  let bundleRepository: BundleRepository
  let starRepository: StarRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarController],
      providers: [StarService, BundleRepository, StarRepository],
    }).compile()

    controller = module.get<StarController>(StarController)
    service = module.get(StarService)
    bundleRepository = module.get(BundleRepository)
    starRepository = module.get(StarRepository)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
