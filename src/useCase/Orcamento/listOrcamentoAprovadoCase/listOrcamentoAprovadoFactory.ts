import { ListOrcamentoAprovadoController } from './listOrcamentoAprovadoController';

export const listOrcamentoFactory = () => {
/*   const prismaOrcamentoRepository = new PrismaOrcamentoRepository(prismaClient);
  const listOrcamentoCase = new ListOrcamentoCase(prismaOrcamentoRepository); */
  const listOrcamentoController = new ListOrcamentoAprovadoController();

  return listOrcamentoController;
};
