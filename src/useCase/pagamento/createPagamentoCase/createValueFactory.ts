import { CreatePagamentoController } from "./createPagamentoController";

export const createPagamentoFactory = () => {
/*   const prismaPagamentoRepository = new PrismaPagamentoRepository(prismaClient);
  const createPagamentosCase = new CreatePagamentoCase(prismaPagamentoRepository); */
  const createPagamentoController = new CreatePagamentoController();

  return createPagamentoController;
};
