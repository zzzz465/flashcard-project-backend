import { EntityRepository, Repository } from 'typeorm'
import { Card } from './entities/card.entity'

@EntityRepository()
export class CardRepository extends Repository<Card> {}
