import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task.entity";
import { Tag } from "./tag.entity";

@Entity()
export class TasksTags {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Column({
        type: 'int',
        name: 'task_id',
    })
    task_id: number;

    @Column({
        type: 'int',
        name: 'tag_id',
    })
    tag_id: number;

    // @ManyToOne(() => Task, (task) => task.id)
    // task_id: Task;

    // @ManyToOne(() => Tag, (tag) => tag.id)
    // tag_id: Tag;
}