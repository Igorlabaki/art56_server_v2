import { GetValueByTituloCase } from './getValueByTituloCase';
import { GetValueByTituloController } from './getValueByTituloController';

import { prismaClient } from '@/backend/prisma/client';
import { PrismaValueRepository } from '@/backend/repository/inPrisma/prismaValueRepository';

export const getValueByTituloFactory = () => {
  const prismaValueRepository = new PrismaValueRepository(prismaClient);
  const getValueByTituloCase = new GetValueByTituloCase(prismaValueRepository);
  const getValueByTituloController = new GetValueByTituloController(getValueByTituloCase);

  return getValueByTituloController;
};
