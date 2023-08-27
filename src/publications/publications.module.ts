import { Module, forwardRef } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PublicationsRepository } from './publications.repository';
import { MediasModule } from '../medias/medias.module';
import { PostsModule } from '../posts/posts.module';
import { MediasRepository } from '../medias/medias.repository';
import { PostsRepository } from '../posts/posts.repository';

@Module({
  imports: [forwardRef(() => MediasModule), forwardRef(() => PostsModule)],
  controllers: [PublicationsController],
  providers: [
    PublicationsService,
    PublicationsRepository,
    MediasRepository,
    PostsRepository,
  ],
})
export class PublicationsModule {}
