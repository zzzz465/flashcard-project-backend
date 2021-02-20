import { Injectable } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { Star } from './entities/star.entity'

@EntityRepository(Star)
export class StarRepository extends Repository<Star> {}
