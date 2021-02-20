import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BundleRepository } from '../bundle/bundle.repository'
import { UserRepository } from '../user/user.repository'
import { StarController } from './star.controller'
import { StarRepository } from './star.repository'
import { StarService } from './star.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StarRepository,
      UserRepository,
      BundleRepository,
    ]),
  ],
  controllers: [StarController],
  providers: [StarService],
})
export class StarModule {}
