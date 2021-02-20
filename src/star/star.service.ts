import { Injectable } from '@nestjs/common'
import { BundleRepository } from '../bundle/bundle.repository'
import { UserRepository } from '../user/user.repository'
import { StarRepository } from './star.repository'

@Injectable()
export class StarService {
  constructor(
    private readonly starRepository: StarRepository,
    private readonly userRepository: UserRepository,
    private readonly bundleRepository: BundleRepository,
  ) {}

  async getAllStars(userId: number) {
    return await this.starRepository.findOne(userId)
  }

  async addStar(userId: number, bundleId: number) {
    const user = await this.userRepository.findOne(userId)
    const bundle = await this.bundleRepository.findOne(bundleId)
    if (user) {
      if (bundle) {
        const exist = await this.starRepository.findOne({
          where: { user: userId, bundle: bundleId },
        })

        if (!exist) {
          const star = this.starRepository.create({
            bundle: { id: bundleId },
            user: { id: userId },
          })

          await this.starRepository.save(star)
          return 'OK'
        } else {
          return 'STAR_ALREADY_EXIST'
        }
      } else {
        return 'BUNDLE_NOT_EXIST'
      }
    } else {
      return 'USER_NOT_EXIST'
    }
  }

  async deleteStar(userId: number, bundleId: number) {
    const star = await this.starRepository.findOne({
      where: { userId: userId, bundleId: bundleId },
    })

    if (star) {
      await this.starRepository.remove(star)
      return star
    } else {
      return 'star_not_found'
    }
  }
}
