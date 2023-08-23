import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PublicationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createPublicationDto: CreatePublicationDto) {
    console.log(createPublicationDto);
    return 'This action adds a new publication';
  }

  findAll() {
    return `This action returns all publications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publication`;
  }

  update(id: number, updatePublicationDto: UpdatePublicationDto) {
    console.log(updatePublicationDto);
    return `This action updates a #${id} publication`;
  }

  remove(id: number) {
    return `This action removes a #${id} publication`;
  }
}
