import { ListOrcamentoAprovadoController } from './listOrcamentoAprovadoController';

export const listOrcamentoAprovadoFactory = () => {
/*   const prismaOrcamentoAprovadoRepository = new PrismaOrcamentoAprovadoRepository(prismaClient);
  const listOrcamentoAprovadoCase = new ListOrcamentoAprovadoCase(prismaOrcamentoAprovadoRepository); */
  const listOrcamentoAprovadoController = new ListOrcamentoAprovadoController();

  return listOrcamentoAprovadoController;
};
