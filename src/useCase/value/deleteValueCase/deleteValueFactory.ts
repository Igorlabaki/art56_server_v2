import { DeleteValueCase } from './deleteValueCase';
import { DeleteValueController } from './deleteValueController';

import { prismaClient } from '@/backend/prisma/client';
import { PrismaValueRepository } from '@/backend/repository/inPrisma/prismaValueRepository';

export const deleteValueFactory = () => {
  const prismaValueRepository = new PrismaValueRepository(prismaClient);
  const deleteValuesCase = new DeleteValueCase(prismaValueRepository);
  const deleteValueController = new DeleteValueController(deleteValuesCase);

  return deleteValueController;
};
