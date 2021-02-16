import { Injectable } from '@nestjs/common'
import { BundleRepository } from './bundle.repository'
import { CreateBundleDto } from './dto/create-bundle.dto'
import { UpdateBundleDto } from './dto/update-bundle.dto'

@Injectable()
export class BundleService {
  constructor(private readonly bundleRepository: BundleRepository) {}

  async create({ owner, cards, description, title }: CreateBundleDto) {
    const bundle = this.bundleRepository.create({
      cards: cards,
      owner,
    })
    await this.bundleRepository.save(bundle)
    return bundle
  }

  findAll(id?: number) {
    if (id) {
      return this.bundleRepository.find({ where: { id } })
    } else {
      return this.bundleRepository.find()
    }
  }

  findOne(id: number) {
    return this.bundleRepository.findOne(id)
  }

  update(id: number, updateBundleDto: UpdateBundleDto) {
    return `This action updates a #${id} bundle`
  }

  remove(id: number) {
    return `This action removes a #${id} bundle`
  }
}
