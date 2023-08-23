import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediasModule } from './medias/medias.module';
import { PostsModule } from './posts/posts.module';
import { PublicationsModule } from './publications/publications.module';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    MediasModule,
    PostsModule,
    PublicationsModule,
    HealthModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
