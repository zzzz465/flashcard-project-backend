import { IsEmail } from 'class-validator'
import { Bundle } from '../../bundle/entities/bundle.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

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
}
