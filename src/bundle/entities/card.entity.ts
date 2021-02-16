import { Column, ManyToOne } from 'typeorm'
import { Bundle } from './bundle.entity'

export class Card {
  @ManyToOne((type) => Bundle, (bundle) => bundle.cards, {
    onDelete: 'CASCADE',
  })
  bundle: Bundle
  @Column()
  front: string
  @Column()
  back: string
}
