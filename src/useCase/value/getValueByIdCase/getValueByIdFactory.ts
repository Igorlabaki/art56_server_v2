import { GetValueByIdCase } from './getValueByIdCase';
import { GetValueByIdController } from './getValueByIdController';

import { prismaClient } from '@/backend/prisma/client';
import { PrismaValueRepository } from '@/backend/repository/inPrisma/prismaValueRepository';

export const getValueByIdFactory = () => {
  const prismaValueRepository = new PrismaValueRepository(prismaClient);
  const getValueByIdCase = new GetValueByIdCase(prismaValueRepository);
  const getValueByIdController = new GetValueByIdController(getValueByIdCase);

  return getValueByIdController;
};
