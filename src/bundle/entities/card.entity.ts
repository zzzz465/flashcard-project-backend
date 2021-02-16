import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Bundle } from './bundle.entity'

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne((type) => Bundle, (bundle) => bundle.cards, {
    onDelete: 'CASCADE',
  })
  bundle: Bundle
  @Column()
  front: string
  @Column()
  back: string
}
