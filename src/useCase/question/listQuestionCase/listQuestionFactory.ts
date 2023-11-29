import { PrismaQuestionRepository } from "../../../repository/inPrisma/prismaQuestionRepository";
import { prismaClient } from "../../../service/prisma";
import { ListQuestionController } from "./listQuesitonController";

export const listQuestionFactory = () => {
  /* const prismaQuestionRepository = new PrismaQuestionRepository(prismaClient);
  const listQuestionCase = new ListQuestionsCase(prismaQuestionRepository); */
  const listQuestionController = new ListQuestionController();

  return listQuestionController;
};
