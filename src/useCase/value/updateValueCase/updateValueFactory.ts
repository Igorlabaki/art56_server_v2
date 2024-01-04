import { UpdateValueCase } from './updateValueCase';
import { UpdateValueController } from './updateValueController';

import { prismaClient } from '@/backend/prisma/client';
import { PrismaValueRepository } from '@/backend/repository/inPrisma/prismaValueRepository';

export const updateValueFactory = () => {
  const prismaValueRepository = new PrismaValueRepository(prismaClient);
  const updateValuesCase = new UpdateValueCase(prismaValueRepository);
  const updateValueController = new UpdateValueController(updateValuesCase);

  return updateValueController;
};
