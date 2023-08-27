import { PrismaService } from '../../src/prisma/prisma.service';
import * as dayjs from 'dayjs';

export class PublicationFactory {
  static async build(prisma: PrismaService, mediaId: number, postId: number) {
    return await prisma.publication.create({
      data: {
        mediaId,
        postId,
        date: dayjs().add(4, 'day').toDate(),
      },
    });
  }
}
