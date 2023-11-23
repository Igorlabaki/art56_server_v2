import { GetTextByIdCase } from './getTextByIdCase';
import { prismaClient } from '../../../service/prisma';
import { GetTextByIdController } from './getTextByIdController';
import { PrismaTextRepository } from "../../../repository/inPrisma/prismaTextRepository";

export const getTextByIdFactory = () => {
/*   const prismaTextRepository = new PrismaTextRepository(prismaClient);
  const getTextByIdCase = new GetTextByIdCase(prismaTextRepository); */
  const getTextByIdController = new GetTextByIdController();

  return getTextByIdController;
};
