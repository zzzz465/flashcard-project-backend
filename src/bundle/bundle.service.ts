import { Injectable } from '@nestjs/common'
import { UserToken } from '../auth/jwt.interface'
import { BundleRepository } from './bundle.repository'
import { Action, BundleAbilityFactory } from './casl-ability.factory'
import { CreateBundleDto } from './dto/create-bundle.dto'
import { UpdateBundleDto } from './dto/update-bundle.dto'
import { Bundle } from './entities/bundle.entity'

@Injectable()
export class BundleService {
  constructor(private readonly bundleRepository: BundleRepository) {}

  async create(
    user: UserToken,
    { cards, description, title, isPrivate }: CreateBundleDto,
  ): Promise<Bundle | false> {
    const bundle = this.bundleRepository.create({
      cards,
      owner: user.id,
      description,
      title,
      isPrivate: isPrivate || false,
    })
    await this.bundleRepository.save(bundle)
    return bundle
  }

  findAll(userId?: number) {
    if (userId) {
      return this.bundleRepository.find({ where: { owner: userId } })
    } else {
      return this.bundleRepository.find()
    }
  }

  findOne(id: number) {
    return this.bundleRepository.findOne(id)
  }

  async update(
    bundleId: number,
    user: UserToken,
    { cards, description, title, isPrivate }: UpdateBundleDto,
  ) {
    cards?.map((card) => (card.bundle = bundleId))
    const bundle = await this.bundleRepository.findOne(bundleId)
    if (bundle && bundle.owner === user.id) {
      return await this.bundleRepository.save({
        id: bundleId,
        cards,
        description,
        title,
        isPrivate,
      })
    } else {
      return false
    }
  }

  async remove(id: number, user: UserToken) {
    const bundle = await this.bundleRepository.findOne(id)
    if (bundle) {
      if (bundle.owner === user.id) {
        await this.bundleRepository.delete({
          id,
        })
        return 'SUCCESS'
      } else {
        return 'UNAUTHORIZED'
      }
    } else {
      return 'NOTFOUND'
    }
  }
}
