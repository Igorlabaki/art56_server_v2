import { CreateOrcamentoController } from './createOrcamentoController';

export const createOrcamentoFactory = () => {
/*   const prismaOrcamentoRepository = new PrismaOrcamentoRepository(prismaClient);
  const createOrcamentosCase = new CreateOrcamentoCase(prismaOrcamentoRepository); */
  const createOrcamentoController = new CreateOrcamentoController();

  return createOrcamentoController;
};
