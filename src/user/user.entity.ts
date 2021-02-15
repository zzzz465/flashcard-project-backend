import { IsEmail } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string
  @Column()
  name: string
  @Column()
  email: string
  //TODO - 이거 hex 로 저장하게 바꾸자
  @Column({ comment: 'password encrypted with bcrypt' })
  encrypted: string
}
