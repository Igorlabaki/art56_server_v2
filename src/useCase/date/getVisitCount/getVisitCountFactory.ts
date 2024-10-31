import { GetVisitCountController } from "./getVisitCountController";


export const getVisitCountFactory = () => {
/*   const prismaOrcamentoRepository = new PrismaOrcamentoRepository(prismaClient);
  const listOrcamentoCase = new ListOrcamentoCase(prismaOrcamentoRepository); */
  const getVisitCountController = new GetVisitCountController();

  return getVisitCountController;
};
