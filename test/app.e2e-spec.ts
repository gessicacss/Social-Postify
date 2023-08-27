import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { MediaFactory } from './factories/media.factory';
import { PostFactory } from './factories/post.factory';
import { PublicationFactory } from './factories/publication.factory';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    prisma = await moduleFixture.get(PrismaService);
    await prisma.publication.deleteMany();
    await prisma.media.deleteMany();
    await prisma.post.deleteMany();

    await app.init();
  });

  it('/HEALTH (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect("I'm okay!");
  });

  describe('Media tests', () => {
    it('POST /medias should post a media', async () => {
      const media = {
        title: 'test',
        username: 'test',
      };

      const response = await request(app.getHttpServer())
        .post('/medias')
        .send(media);
      expect(response.statusCode).toBe(HttpStatus.CREATED);
      expect(response.body).toEqual(
        expect.objectContaining({
          title: expect.any(String),
          username: expect.any(String),
        }),
      );
    });

    it('GET /medias should get medias', async () => {
      await MediaFactory.build(prisma);

      const response = await request(app.getHttpServer()).get('/medias');
      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            createdAt: expect.any(String),
            id: expect.any(Number),
            title: expect.any(String),
            updatedAt: expect.any(String),
            username: expect.any(String),
          }),
        ]),
      );
    });

    it('GET /medias/:id should get media by id', async () => {
      const media = await MediaFactory.build(prisma);

      const response = await request(app.getHttpServer()).get(
        `/medias/${media.id}`,
      );
      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          createdAt: expect.any(String),
          id: expect.any(Number),
          title: expect.any(String),
          updatedAt: expect.any(String),
          username: expect.any(String),
        }),
      );
    });

    it('PUT /medias/:id should update media by id', async () => {
      const media = await MediaFactory.build(prisma);
      const newData = { username: 'just updated! ' };

      const response = await request(app.getHttpServer())
        .put(`/medias/${media.id}`)
        .send(newData);
      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          createdAt: expect.any(String),
          id: expect.any(Number),
          title: expect.any(String),
          updatedAt: expect.any(String),
          username: newData.username,
        }),
      );
    });

    it('DELETE /medias/:id should delete media with this id', async () => {
      const media = await MediaFactory.build(prisma);

      const response = await request(app.getHttpServer()).delete(
        `/medias/${media.id}`,
      );
      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          createdAt: expect.any(String),
          id: expect.any(Number),
          title: expect.any(String),
          updatedAt: expect.any(String),
          username: expect.any(String),
        }),
      );
    });
  });

  describe('Posts tests', () => {
    it('POST /posts should post a posts', async () => {
      const postData = {
        title: 'my title',
        text: 'my text',
      };

      const response = await request(app.getHttpServer())
        .post('/posts')
        .send(postData);
      expect(response.statusCode).toBe(HttpStatus.CREATED);
      expect(response.body).toEqual(
        expect.objectContaining({
          createdAt: expect.any(String),
          id: expect.any(Number),
          title: expect.any(String),
          image: null,
          text: expect.any(String),
          updatedAt: expect.any(String),
        }),
      );
    });

    it('GET /posts should get posts', async () => {
      await PostFactory.build(prisma);

      const response = await request(app.getHttpServer()).get('/posts');
      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            createdAt: expect.any(String),
            id: expect.any(Number),
            title: expect.any(String),
            image: null,
            text: expect.any(String),
            updatedAt: expect.any(String),
          }),
        ]),
      );
    });

    it('GET /posts/:id should get posts by id', async () => {
      const post = await PostFactory.build(prisma);

      const response = await request(app.getHttpServer()).get(
        `/posts/${post.id}`,
      );
      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          createdAt: expect.any(String),
          id: expect.any(Number),
          title: expect.any(String),
          image: null,
          text: expect.any(String),
          updatedAt: expect.any(String),
        }),
      );
    });

    it('DELETE /posts/:id should delete posts with this id', async () => {
      const post = await PostFactory.build(prisma);

      const response = await request(app.getHttpServer()).delete(
        `/posts/${post.id}`,
      );
      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          createdAt: expect.any(String),
          id: expect.any(Number),
          title: expect.any(String),
          image: null,
          text: expect.any(String),
          updatedAt: expect.any(String),
        }),
      );
    });
  });

  describe('Publications tests', () => {
    it('POST /publications should post a publication', async () => {
      const media = await MediaFactory.build(prisma);
      const post = await PostFactory.build(prisma);
      const createDate = new Date();

      const response = await request(app.getHttpServer())
        .post('/publications')
        .send({ mediaId: media.id, postId: post.id, date: createDate });
      expect(response.statusCode).toBe(HttpStatus.CREATED);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          mediaId: media.id,
          postId: post.id,
          date: expect.any(String),
        }),
      );
    });

    it('GET /publications should get publications', async () => {
      const media = await MediaFactory.build(prisma);
      const post = await PostFactory.build(prisma);
      await PublicationFactory.build(prisma, media.id, post.id);

      const response = await request(app.getHttpServer()).get('/publications');
      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            createdAt: expect.any(String),
            id: expect.any(Number),
            mediaId: expect.any(Number),
            postId: expect.any(Number),
            date: expect.any(String),
          }),
        ]),
      );
    });

    it('GET /publications/:id should get publications by id', async () => {
      const media = await MediaFactory.build(prisma);
      const post = await PostFactory.build(prisma);
      const publication = await PublicationFactory.build(
        prisma,
        media.id,
        post.id,
      );

      const response = await request(app.getHttpServer()).get(
        `/publications/${publication.id}`,
      );
      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          createdAt: expect.any(String),
          id: expect.any(Number),
          mediaId: expect.any(Number),
          postId: expect.any(Number),
          date: expect.any(String),
        }),
      );
    });

    it('PUT /publications/:id should update publication by id', async () => {
      const media = await MediaFactory.build(prisma);
      const post = await PostFactory.build(prisma);
      const publication = await PublicationFactory.build(
        prisma,
        media.id,
        post.id,
      );

      const secondMedia = await MediaFactory.build(prisma);
      const newData = { mediaId: secondMedia.id };

      const response = await request(app.getHttpServer())
        .put(`/publications/${publication.id}`)
        .send(newData);
      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          createdAt: expect.any(String),
          id: expect.any(Number),
          mediaId: newData.mediaId,
          postId: expect.any(Number),
          date: expect.any(String),
        }),
      );
    });

    it('DELETE /publication/:id should delete publication with this id', async () => {
      const media = await MediaFactory.build(prisma);
      const post = await PostFactory.build(prisma);
      const publication = await PublicationFactory.build(
        prisma,
        media.id,
        post.id,
      );

      const response = await request(app.getHttpServer()).delete(
        `/publications/${publication.id}`,
      );
      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          createdAt: expect.any(String),
          id: expect.any(Number),
          mediaId: media.id,
          postId: post.id,
          date: expect.any(String),
        }),
      );
    });
  });
});
