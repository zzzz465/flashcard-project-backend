import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Card } from './Card';

@Entity()
export class Bundle extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number
    @OneToMany( (type) => Card, (image) => image.bundle, {
        cascade: true
    })
    cards!: Card[]
}