import { GetByQuestionController } from "./getByQuestionController";


export const getByQuestionFactory = () => {
/*   const prismaRepository = new PrismaTextRepository(prismaClient);
  const getTextByAreaCase = new GetTextByAreaCase(prismaRepository); */
  const getTextByAreaController = new GetByQuestionController();

  return getTextByAreaController;
};
