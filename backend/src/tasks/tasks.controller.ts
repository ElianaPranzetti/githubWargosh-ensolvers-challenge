import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from "./dtos";
import { TasksService } from "./tasks.service";

@Controller('tasks')
export class TasksController {

    constructor(private readonly taskService: TasksService) { }

    @Get()
    async getTasks() {
        const data = await this.taskService.getTasks();
        return {
            message: 'OK',
            data
        }
    }

    @Get(':task_id')
    async getTask(@Param('task_id') taskId: string) {
        return await this.taskService.getTask(parseInt(taskId));
    }

    @Post()
    createTask(@Body() task: CreateTaskDto) {
        console.log(task);
        return this.taskService.createTask(task);
    }

    @Put(':task_id')
    editTask(@Body() task: UpdateTaskDto, @Param('task_id') taskId) {
        console.log(taskId);
        console.log(task);
        return this.taskService.updateTask(taskId, task);
    }

    @Delete(':task_id')
    removeTask(@Param('task_id') taskId) {
        console.log(taskId);

        return this.taskService.deleteTask(taskId);
    }
}
