import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './publications.repository';
import { MediasRepository } from '../medias/medias.repository';
import { PostsRepository } from '../posts/posts.repository';
import * as dayjs from 'dayjs';

@Injectable()
export class PublicationsService {
  constructor(
    private readonly publicationsRepository: PublicationsRepository,
    private readonly mediaRepository: MediasRepository,
    private readonly postsRepository: PostsRepository,
  ) {}

  async create(createPublicationDto: CreatePublicationDto) {
    const { mediaId, postId } = createPublicationDto;

    const [media, post] = await Promise.all([
      this.mediaRepository.findMediaById(mediaId),
      this.postsRepository.findOne(postId),
    ]);
    if (!media || !post) {
      throw new NotFoundException('Theres no media or post with this id');
    }

    return await this.publicationsRepository.create(createPublicationDto);
  }

  async findAll(published: boolean | null, after: string | null) {
    let currentDate: Date = null;
    if (published) {
      currentDate = new Date();
    }
    const publications = await this.publicationsRepository.findAll(
      currentDate,
      after,
    );
    return publications;
  }

  async findOne(id: number) {
    const publication = await this.publicationsRepository.findOne(id);
    if (!publication) {
      throw new NotFoundException('Theres no publication with this id');
    }
    return publication;
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    const { mediaId, postId } = updatePublicationDto;

    const publication = await this.publicationsRepository.findOne(id);
    if (!publication) {
      throw new NotFoundException('Theres no publication with this id');
    }

    const [media, post] = await Promise.all([
      this.mediaRepository.findMediaById(mediaId),
      this.postsRepository.findOne(postId),
    ]);
    if (!media || !post) {
      throw new NotFoundException('Theres no media or post with this id');
    }

    const currentDate = new Date(Date.now());
    const IsPublished = dayjs(currentDate).isAfter(publication.date);

    if (IsPublished) {
      throw new ForbiddenException(
        'You cant update this publication because it was published already!',
      );
    }

    return await this.publicationsRepository.update(id, updatePublicationDto);
  }

  async remove(id: number) {
    const publication = await this.publicationsRepository.findOne(id);
    if (!publication) {
      throw new NotFoundException('Theres no media with this id');
    }
    await this.publicationsRepository.remove(id);
    return 'Publication deleted!';
  }
}
