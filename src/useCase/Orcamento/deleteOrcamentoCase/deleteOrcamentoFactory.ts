import { DeleteOrcamentoController } from './deleteOrcamentoController';

export const deleteOrcamentoFactory = () => {
 /*  const prismaOrcamentoRepository = new PrismaOrcamentoRepository(prismaClient);
  const deleteOrcamentosCase = new DeleteOrcamentotCase(prismaOrcamentoRepository); */
  const deleteOrcamentoController = new DeleteOrcamentoController();

  return deleteOrcamentoController;
};
