import { IsNumber } from "class-validator";

export class CreateRelationTagDto {
    @IsNumber()
    task_id: number;

    @IsNumber()
    tag_id: number;
}
