import { User } from '../../user/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Card } from './card.entity'

@Entity()
export class Bundle {
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

  @Column({ default: false })
  isPrivate!: boolean
}
