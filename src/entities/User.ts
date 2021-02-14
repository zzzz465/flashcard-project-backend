import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Bundle } from './Bundle'

export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: string
    @Column()
    email!: string
    @Column()
    bundles!: Bundle[]
    @Column()
    password!: string
}