import { GetTrafegoCountController } from "./getTrafegoCountController";

export const getTrafegoCountFactory = () => {
/*   const prismaOrcamentoRepository = new PrismaOrcamentoRepository(prismaClient);
  const listOrcamentoCase = new ListOrcamentoCase(prismaOrcamentoRepository); */
  const getTrafegoCountController = new GetTrafegoCountController();

  return getTrafegoCountController;
};
