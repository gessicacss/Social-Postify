import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMediaDto) {
    return await this.prisma.media.create({ data });
  }

  async findAll() {
    return this.prisma.media.findMany();
  }

  async findMediaById(id: number) {
    return await this.prisma.media.findFirst({ where: { id } });
  }

  async findMediaByData(title: string, username: string) {
    return await this.prisma.media.findFirst({
      where: {
        title,
        AND: {
          username,
        },
      },
    });
  }

  async update(id: number, data: UpdateMediaDto) {
    return await this.prisma.media.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    return await this.prisma.media.delete({ where: { id } });
  }
}
