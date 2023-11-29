import { GetQuestionByIdCase } from './getQuestionByIdCase';
import { prismaClient } from '../../../service/prisma';
import { GetQuestionByIdController } from './getQuestionByIdController';
import { PrismaQuestionRepository } from "../../../repository/inPrisma/prismaQuestionRepository";

export const getQuestionByIdFactory = () => {
/*   const prismaQuestionRepository = new PrismaQuestionRepository(prismaClient);
  const getQuestionByIdCase = new GetQuestionByIdCase(prismaQuestionRepository); */
  const getQuestionByIdController = new GetQuestionByIdController();

  return getQuestionByIdController;
};
