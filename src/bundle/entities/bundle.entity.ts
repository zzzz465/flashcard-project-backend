import { User } from '../../user/entities/user.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Card } from './card.entity'

@Entity()
export class Bundle {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne((type) => User, (user) => user.bundles)
  owner: string
  @OneToMany((type) => Card, (card) => card.bundle, {
    cascade: true,
    eager: true,
  })
  cards: Card[]
  @Column({ default: false })
  private: boolean
}
