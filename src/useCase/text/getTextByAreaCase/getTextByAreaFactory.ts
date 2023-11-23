import { prismaClient } from "../../../service/prisma";
import { GetTextByAreaCase } from './getTextByAreaCase';
import { GetTextByAreaController } from './getTextByAreaController';
import { PrismaTextRepository } from "../../../repository/inPrisma/prismaTextRepository";

export const getTextByAreaFactory = () => {
/*   const prismaRepository = new PrismaTextRepository(prismaClient);
  const getTextByAreaCase = new GetTextByAreaCase(prismaRepository); */
  const getTextByAreaController = new GetTextByAreaController();

  return getTextByAreaController;
};
