import { User } from '../../user/entities/user.entity'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Card } from './card.entity'
import { Star } from '../../star/entities/star.entity'

@Entity()
export class Bundle extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne((type) => User, (user) => user.bundles, {
    nullable: false,
  })
  @JoinColumn({ name: 'owner' })
  @Column()
  owner!: number

  @Column({ default: '' })
  title!: string

  @Column({ default: '' })
  description!: string

  @UpdateDateColumn({ type: 'date' })
  updatedDate!: Date

  @CreateDateColumn({ type: 'date' })
  createdDate!: Date

  @OneToMany((type) => Card, (card) => card.bundle, {
    cascade: true,
    eager: true,
    nullable: false,
  })
  cards!: Card[]

  @OneToMany((type) => Star, (star) => star.bundle)
  stars!: Star[]

  @Column({ default: false })
  isPrivate!: boolean
}
