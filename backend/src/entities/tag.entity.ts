import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'tag_id'
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 80,
        nullable: false,
    })
    name!: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}