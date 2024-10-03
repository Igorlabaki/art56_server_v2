import { GetMonthCountController } from "./getMonthCountController";

export const getMonthCountFactory = () => {
/*   const prismaOrcamentoRepository = new PrismaOrcamentoRepository(prismaClient);
  const listOrcamentoCase = new ListOrcamentoCase(prismaOrcamentoRepository); */
  const getMonthCountController = new GetMonthCountController();

  return getMonthCountController;
};
