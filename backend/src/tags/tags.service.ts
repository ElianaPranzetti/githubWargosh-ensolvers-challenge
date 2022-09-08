import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { Tag } from "../entities";
import { CreateTagDto, FindTagDto } from "./dtos";

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagsRepository: Repository<Tag>
    ) { }

    async getTags(): Promise<Tag[]> {
        return await this.tagsRepository.find();
    }

    async getTag(id: number): Promise<Tag> {
        const tag = await this.tagsRepository.findOneBy({ id });
        if (!tag)
            throw new NotFoundException('Tag does not exist');

        return tag;
    }

    async findTagsByName(tag: FindTagDto): Promise<Tag[]> {
        return await this.tagsRepository.findBy({
            name: Like(`%${tag.name}%`),
        });
    }

    async createTag(tagDto: CreateTagDto) {
        const tag = this.tagsRepository.create(tagDto);
        return await this.tagsRepository.save(tag);
    }

    async deleteTag(id: number) {
        return await this.tagsRepository.delete(id)
    }
}
