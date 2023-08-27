import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';
import { PublicationsRepository } from '../publications/publications.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly publicationsRepository: PublicationsRepository,
  ) {}

  async create(createPostDto: CreatePostDto) {
    return await this.postsRepository.create(createPostDto);
  }

  async findAll() {
    return await this.postsRepository.findAll();
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne(id);
    if (!post) {
      throw new NotFoundException('Theres no post with this id');
    }

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.findOne(id);
    if (!post) {
      throw new NotFoundException('Theres no post with this id');
    }

    return await this.postsRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    const postExists = await this.postsRepository.findOne(id);
    if (!postExists) {
      throw new NotFoundException('Theres no post with this id');
    }

    const publicationExists = this.publicationsRepository.findOne(id);
    if (publicationExists) {
      throw new ForbiddenException('Theres a publication with this post!');
    }

    await this.postsRepository.remove(id);
    return 'Post deleted!';
  }
}
