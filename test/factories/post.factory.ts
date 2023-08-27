import { PrismaService } from '../../src/prisma/prisma.service';
import { faker } from '@faker-js/faker';

export class PostFactory {
  static async build(prisma: PrismaService) {
    return await prisma.post.create({
      data: {
        title: faker.company.catchPhrase(),
        text: faker.company.buzzPhrase(),
      },
    });
  }
}
