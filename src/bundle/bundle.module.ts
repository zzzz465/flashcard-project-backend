import { Module } from '@nestjs/common'
import { BundleService } from './bundle.service'
import { BundleController } from './bundle.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BundleRepository } from './bundle.repository'
import { CardRepository } from './card.repository'

@Module({
  imports: [TypeOrmModule.forFeature([BundleRepository, CardRepository])],
  controllers: [BundleController],
  providers: [BundleService],
})
export class BundleModule {}
