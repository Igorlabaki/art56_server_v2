import { ListOrcamentoController } from './listOrcamentoController';

export const listOrcamentoFactory = () => {
/*   const prismaOrcamentoRepository = new PrismaOrcamentoRepository(prismaClient);
  const listOrcamentoCase = new ListOrcamentoCase(prismaOrcamentoRepository); */
  const listOrcamentoController = new ListOrcamentoController();

  return listOrcamentoController;
};
