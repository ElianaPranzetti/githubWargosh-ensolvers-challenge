import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsOptional()
    @IsBoolean()
    archived: boolean;

    @IsOptional()
    @IsArray({})
    // @IsNumber()
    tags?: number[];
}
