import { IsBoolean } from "class-validator";

export class FindStatusTaskDto {
    @IsBoolean()
    archived: boolean;
}
