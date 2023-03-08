import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class PgUser {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: true })
    name?: string

    @Column()
    email!: string

    @Column({ name: 'facebook_id', nullable: true })
    facebookId?: string
}
