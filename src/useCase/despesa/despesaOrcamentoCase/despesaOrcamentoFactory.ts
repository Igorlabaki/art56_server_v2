import { CreateDespesaController } from "./despesaOrcamentoController";

export const createDespesaFactory = () => {
/*   const prismaDespesaRepository = new PrismaDespesaRepository(prismaClient);
  const createDespesasCase = new CreateDespesaCase(prismaDespesaRepository); */
  const createDespesaController = new CreateDespesaController();

  return createDespesaController;
};
