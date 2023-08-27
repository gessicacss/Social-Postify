import { PrismaService } from '../../src/prisma/prisma.service';
import { faker } from '@faker-js/faker';

export class MediaFactory {
  static async build(prisma: PrismaService) {
    return await prisma.media.create({
      data: {
        title: faker.company.name(),
        username: faker.company.catchPhrase(),
      },
    });
  }
}
