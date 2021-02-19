import { ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm'
import { Bundle } from '../../bundle/entities/bundle.entity'
import { User } from '../../user/entities/user.entity'

export class Star {
  @PrimaryColumn({ type: 'int' })
  @ManyToOne((type) => User, (user) => user.stars, {
    cascade: true,
    eager: true,
  })
  userId!: number

  @ManyToMany((type) => Bundle, (bundle) => bundle.stars)
  bundles!: Bundle[]
}
