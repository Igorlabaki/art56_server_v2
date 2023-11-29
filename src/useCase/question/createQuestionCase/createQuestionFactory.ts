import { CreateQuestionController } from "./createQuestionController";

export const createQuestionFactory = () => {
/* const prismaQuestionRepository = new PrismaQuestionRepository(prismaClient);
  const createQuestionsCase = new CreateQuestionCase(prismaQuestionRepository); */
  const createQuestionController = new CreateQuestionController();

  return createQuestionController;
};
