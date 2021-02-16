import { User } from '../../user/entities/user.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Card } from './card.entity'

@Entity()
export class Bundle {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne((type) => User, (user) => user.bundles, {
    nullable: false,
  })
  @JoinColumn({ name: 'owner' })
  @Column()
  owner: number
  @OneToMany((type) => Card, (card) => card.bundle, {
    cascade: true,
    nullable: false,
  })
  cards: Card[]
  @Column({ default: false })
  private: boolean
}
