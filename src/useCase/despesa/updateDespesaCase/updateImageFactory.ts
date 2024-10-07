import { UpdateDespesaController } from './updateDespesaController';

export const updateDespesaFactory = () => {
/*   const prismaDespesaRepository = new PrismaDespesaRepository(prismaClient);
  const updateDespesasCase = new UpdateDespesaCase(prismaDespesaRepository); */
  const updateDespesaController = new UpdateDespesaController();

  return updateDespesaController;
};
