import { DeleteQuestionCase } from "./deleteQuestionCase";
import { prismaClient } from "../../../service/prisma";
import { DeleteQuestionController } from "./deleteQuestionController";
import { PrismaQuestionRepository } from "../../../repository/inPrisma/prismaQuestionRepository";

export const deleteQuestionFactory = () => {
/*   const prismaQuestionRepository = new PrismaQuestionRepository(prismaClient);
  const deleteQuestionsCase = new DeleteQuestionCase(prismaQuestionRepository); */
  const deleteQuestionController = new DeleteQuestionController();

  return deleteQuestionController;
};
