import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasRepository } from './medias.repository';

@Injectable()
export class MediasService {
  constructor(private readonly mediasRepository: MediasRepository) {}

  async create(createMediaDto: CreateMediaDto) {
    const { title, username } = createMediaDto;
    const mediaExists = await this.mediasRepository.findMediaByData(
      title,
      username,
    );
    if (mediaExists) {
      throw new ConflictException('A media with this data already exists!');
    }
    return await this.mediasRepository.create(createMediaDto);
  }

  async findAll() {
    return await this.mediasRepository.findAll();
  }

  async findOne(id: number) {
    const media = await this.mediasRepository.findMediaById(id);
    if (!media) {
      throw new NotFoundException('Theres no media with this id');
    }
    return media;
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    const { title, username } = updateMediaDto;

    const media = await this.mediasRepository.findMediaById(id);
    if (!media) {
      throw new NotFoundException('Theres no media with this id');
    }
    const mediaExists = await this.mediasRepository.findMediaByData(
      title,
      username,
    );
    if (mediaExists) {
      throw new ConflictException('A media with this data already exists!');
    }
    return await this.mediasRepository.update(id, updateMediaDto);
  }

  async remove(id: number) {
    const mediaExists = await this.mediasRepository.findMediaById(id);
    if (!mediaExists) {
      throw new NotFoundException('Theres no media with this id');
    }
    return await this.mediasRepository.remove(id);
  }
}
