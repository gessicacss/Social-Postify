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

  async findAll(currentDate: Date | null, after: string | null) {
    return await this.prisma.publication.findMany({
      where: {
        date: {
          lt: currentDate ? currentDate : undefined,
          gte: after ? new Date(after) : undefined,
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.publication.findFirst({ where: { id } });
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
