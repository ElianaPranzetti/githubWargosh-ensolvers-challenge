import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { TasksTags } from "./task_tag.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'task_id'
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 150,
        nullable: false,
    })
    title!: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    description!: string;

    @Column({
        type: 'boolean',
        nullable: false,
        default: false
    })
    done: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    // @OneToMany(() => TasksTags, (tasks_tags) => tasks_tags.task_id)
    // tags?: TasksTags[];
}