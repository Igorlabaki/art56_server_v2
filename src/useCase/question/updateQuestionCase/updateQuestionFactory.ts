import { UpdateQuestionCase } from "./updateQuestionCase";
import { prismaClient } from "../../../service/prisma";
import { UpdateQuestionController } from "./updateQuestionController";
import { PrismaQuestionRepository } from "../../../repository/inPrisma/prismaQuestionRepository";

export const updateQuestionFactory = () => {
/*   const prismaQuestionRepository = new PrismaQuestionRepository(prismaClient);
  const updateQuestionsCase = new UpdateQuestionCase(prismaQuestionRepository); */
  const updateQuestionController = new UpdateQuestionController();

  return updateQuestionController;
};
