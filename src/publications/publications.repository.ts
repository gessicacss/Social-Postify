import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PublicationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePublicationDto) {
    return await this.prisma.publication.create({ data });
  }

  async findAll(published: string | null, after: string | null) {
    const currentDate = new Date();

    return await this.prisma.publication.findMany({
      where: {
        date: {
          lt: published === 'true' ? currentDate : undefined,
          gt: published === 'false' ? currentDate : undefined,
          gte: after ? new Date(after) : undefined,
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.publication.findFirst({ where: { id } });
  }

  async findByPostId(postId: number) {
    return await this.prisma.publication.findFirst({
      where: {
        postId,
      },
    });
  }

  async findByMediaId(mediaId: number) {
    return await this.prisma.publication.findFirst({
      where: {
        mediaId,
      },
    });
  }

  async findByData(mediaId: number, postId: number) {
    return await this.prisma.publication.findFirst({
      where: {
        mediaId,
        AND: {
          postId,
        },
      },
    });
  }

  async update(id: number, data: UpdatePublicationDto) {
    return await this.prisma.publication.update({
      where: {
        id,
      },
      data: {
        ...data,
        updatedAt: new Date(Date.now()),
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.publication.delete({ where: { id } });
  }
}
