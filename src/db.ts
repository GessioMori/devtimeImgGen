import { PrismaClient } from '@prisma/client';

declare const global: Global & { prisma: PrismaClient };

if (!global.prisma) {
  global.prisma = new PrismaClient();
}
export default global.prisma;
