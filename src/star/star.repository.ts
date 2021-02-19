import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Star } from './entities/star.entity'

@Injectable()
export class StarRepository extends Repository<Star> {}
