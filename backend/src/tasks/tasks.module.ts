import { Module } from '@nestjs/common';
import { TypeOrmModule  } from '@nestjs/typeorm';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task, TasksTags } from "../entities";

@Module({
    imports: [TypeOrmModule.forFeature([Task, TasksTags])],
    controllers: [TasksController],
    providers: [TasksService]
})

export class TasksModule {}
