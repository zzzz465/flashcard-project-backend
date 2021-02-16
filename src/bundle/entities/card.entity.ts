import {
  Column,
  Entity,
  JoinColumn,
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
    nullable: false,
  })
  @JoinColumn({ name: 'bundle' })
  @Column()
  bundle: number
  @Column()
  front: string
  @Column()
  back: string
}
