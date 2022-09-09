import { IsNumber } from "class-validator";

export class DeleteTagFromTaskDto {
    @IsNumber()
    task_id: number;

    @IsNumber()
    tag_id: number;
}