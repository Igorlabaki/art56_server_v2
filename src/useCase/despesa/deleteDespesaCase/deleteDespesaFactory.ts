import { DeleteDespesaController } from './deleteDespesaController';

export const deleteDespesaFactory = () => {
/*   const prismaDespesaRepository = new PrismaDespesaRepository(prismaClient);
  const deleteDespesasCase = new DeleteDespesatCase(prismaDespesaRepository); */
  const deleteDespesaController = new DeleteDespesaController();

  return deleteDespesaController;
};
