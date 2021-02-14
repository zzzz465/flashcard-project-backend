import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Card } from './Card';

@Entity()
export class Bundle extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number
    @OneToMany(
        () => Card,
        (image) => image.id
    )
    cards!: Card[]
}