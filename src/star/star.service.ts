import { Injectable } from '@nestjs/common'
import { BundleRepository } from '../bundle/bundle.repository'
import { StarRepository } from './star.repository'

@Injectable()
export class StarService {
  constructor(
    private readonly starRepository: StarRepository,
    private readonly bundleRepository: BundleRepository,
  ) {}

  async getAllStars(userId: number) {
    return await this.starRepository.findOne(userId)
  }

  async addStar(userId: number, bundleId: number) {
    const stars = await this.starRepository.findOne(userId)
    const bundle = await this.bundleRepository.findOne(bundleId)
    if (stars) {
      if (bundle) {
        stars.bundles.push(bundle)
        await this.starRepository.save(stars)
        return 'OK'
      } else {
        return 'BUNDLE_NOT_EXIST'
      }
    } else {
      return 'STARS_NOT_EXIST'
    }
  }
}
