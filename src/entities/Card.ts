import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Bundle } from './Bundle'

@Entity()
export class Card extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    front!: string
    @Column()
    back!: string
    @ManyToOne(
        () => Bundle,
        (bundle) => bundle.cards
    )
    bundle!: Bundle
}