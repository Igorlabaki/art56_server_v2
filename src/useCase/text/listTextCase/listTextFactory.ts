import { PrismaTextRepository } from '../../../repository/inPrisma/prismaTextRepository';
import { prismaClient } from '../../../service/prisma';
import { ListTextController } from './listTextController';
import { ListTextsCase } from './listTextsCase';


export const listTextFactory = () => {
  /* const prismaTextRepository = new PrismaTextRepository(prismaClient);
  const listTextCase = new ListTextsCase(prismaTextRepository); */
  const listTextController = new ListTextController();

  return listTextController;
};
