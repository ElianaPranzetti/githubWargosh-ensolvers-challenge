import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTagDto, FindTagDto } from "./dtos";
import { TagsService } from "./tags.service";

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) { }

    @Get()
    async getTasks() {
        const data = await this.tagsService.getTags();
        return {
            message: 'OK',
            data
        }
    }

    @Get(':tag_id')
    async getTag(@Param('tag_id') tagId: string) {
        return await this.tagsService.getTag(parseInt(tagId));
    }

    @Post('/find')
    findTagByName(@Body() tag: FindTagDto) {
        return this.tagsService.findTagsByName(tag);
    }

    @Post()
    createTag(@Body() tag: CreateTagDto) {
        return this.tagsService.createTag(tag);
    }
}
