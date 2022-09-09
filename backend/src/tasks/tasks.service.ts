import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task, TasksTags } from "../entities";
import { ReadTaskDto, CreateTaskDto, UpdateTaskDto, CreateRelationTagDto, FindStatusTaskDto, DeleteTagFromTaskDto } from "./dtos";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>,

        @InjectRepository(TasksTags)
        private readonly taskstagsRepository: Repository<TasksTags>,
    ) { }

    async getTasks(): Promise<ReadTaskDto[]> {
        const tasks = await this.tasksRepository.find();
        if (!tasks)
            return [];
        else {
            let returnedTasks = [];
            for (let i = 0; i < tasks.length; i++) {
                let _task = new ReadTaskDto();
                const tags = await this.getTagsFromTask(tasks[i])

                _task = { ...tasks[i], tags }
                returnedTasks.push(_task);
            }
            return returnedTasks
        }
    }

    async getTask(id: number): Promise<ReadTaskDto> {
        const task = await this.tasksRepository.findOneBy({ id });
        if (!task)
            throw new NotFoundException('Task does not exist');

        const tags = await this.getTagsFromTask(task)
        return { ...task, tags };
    }

    async getTaskFromStatus(_task: FindStatusTaskDto): Promise<ReadTaskDto[]> {
        const allTasks = await this.getTasks()

        return allTasks.filter((task) => task.archived === _task.archived)
    }

    async createTask(taskDto: CreateTaskDto) {
        const task = this.tasksRepository.create(taskDto);
        const savedTask = await this.tasksRepository.save(task);

        if (taskDto.tags)
            await this.saveTagsFromTask(savedTask.id, taskDto.tags)

        return savedTask;
    }

    async updateTask(id: number, taskDto: UpdateTaskDto) {
        const task = await this.tasksRepository.findOneBy({ id });
        if (!task)
            throw new NotFoundException('Task does not exist');

        await this.deleteTagsFromTask(id);

        const updatedTask = Object.assign(task, taskDto);
        const savedTask = await this.tasksRepository.save(updatedTask);
        if (taskDto.tags)
            await this.saveTagsFromTask(savedTask.id, taskDto.tags)

        return savedTask
    }

    async deleteTask(id: number) {
        await this.deleteTagsFromTask(id);
        return await this.tasksRepository.delete(id)
    }

    async getTagsFromTask(task: Task): Promise<number[]> {
        const tags = await this.taskstagsRepository.findBy({ task_id: task.id });

        let idTags = [];
        tags.map((tag) => idTags.push(tag.tag_id));

        return idTags;
    }

    async saveTagsFromTask(idTask: number, tags: number[]) {
        if (tags.length > 0) {
            for (let i = 0; i < tags.length; i++) {
                const relation = new CreateRelationTagDto()
                relation.task_id = idTask;
                relation.tag_id = tags[i]
                const tasktag = this.taskstagsRepository.create(relation)
                await this.taskstagsRepository.save(tasktag);
            }
        }
    }

    async deleteTagsFromTask(idTask: number) {
        await this.taskstagsRepository.delete({ task_id: idTask });
    }

    async deleteTagFromTask(dto: DeleteTagFromTaskDto) {
        await this.taskstagsRepository.delete({ task_id: dto.task_id, tag_id: dto.tag_id });
    }
}
