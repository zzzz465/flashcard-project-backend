import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Bundle } from './bundle.entity'

@Entity()
export class Card extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number

  @Column({ name: 'bundleId', nullable: false })
  bundleId!: number

  @ManyToOne((type) => Bundle, (bundle) => bundle.cards, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  bundle!: Bundle
  @Column()
  front!: string
  @Column()
  back!: string
}
