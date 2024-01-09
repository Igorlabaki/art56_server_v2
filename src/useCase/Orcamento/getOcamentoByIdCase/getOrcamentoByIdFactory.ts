import { GetOrcamentoByIdController } from './getOrcamentoByIdController';

export const getOrcamentoByIdFactory = () => {
/*   const prismaOrcamentoRepository = new PrismaOrcamentoRepository(prismaClient);
  const getOrcamentoByIdCase = new GetOrcamentoByIdCase(prismaOrcamentoRepository); */
  const getOrcamentoByIdController = new GetOrcamentoByIdController();

  return getOrcamentoByIdController;
};
