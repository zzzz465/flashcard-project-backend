import {
  Column,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Bundle } from '../../bundle/entities/bundle.entity'
import { User } from '../../user/entities/user.entity'

export class Star {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false })
  userId!: number

  @ManyToOne((type) => User, (user) => user.stars, {
    cascade: true,
    eager: true,
  })
  user!: User

  @Column({ nullable: false })
  bundleId!: number

  @ManyToOne((type) => Bundle, (bundle) => bundle.stars, {
    cascade: true,
    eager: true,
  })
  bundle!: Bundle
}
