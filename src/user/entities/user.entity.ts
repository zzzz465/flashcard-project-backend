import { Bundle } from '../../bundle/entities/bundle.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Star } from '../../star/entities/star.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ default: '' })
  name!: string

  @Column({ default: '', unique: true })
  email!: string

  //TODO - 이거 hex 로 저장하게 바꾸자
  //TODO - 이거 hex 로 저장하게 바꾸자
  @Column({ comment: 'password encrypted with bcrypt', nullable: false })
  encrypted!: string

  @OneToMany((type) => Bundle, (bundle) => bundle.owner, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  bundles!: Bundle[]

  @OneToMany((type) => Star, (star) => star.user)
  stars!: Star[]
}
