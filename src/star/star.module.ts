import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StarController } from './star.controller'
import { StarRepository } from './star.repository'
import { StarService } from './star.service'

@Module({
  imports: [TypeOrmModule.forFeature([StarRepository])],
  controllers: [StarController],
  providers: [StarService],
})
export class StarModule {}
