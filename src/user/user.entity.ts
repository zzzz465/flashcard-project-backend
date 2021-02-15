import { IsEmail } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string
  @Column()
  email: string
  @Column({ comment: 'password encrypted with bcrypt' })
  encrypted: string
}
