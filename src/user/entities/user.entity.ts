import { IsEmail } from 'class-validator'
import { Bundle } from 'src/bundle/entities/bundle.entity'
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
  id: string
  @Column({ nullable: true })
  name?: string
  @Column()
  email: string
  //TODO - 이거 hex 로 저장하게 바꾸자
  @Column({ comment: 'password encrypted with bcrypt' })
  encrypted: string
  @OneToMany((type) => Bundle, (bundle) => bundle.owner)
  bundles: Bundle[]
}
