import { DeletePagamentoController } from "./deletePagamentoController";

export const deletePagamentoFactory = () => {
  /*   const prismaPagamentoRepository = new PrismaPagamentoRepository(prismaClient);
  const deletePagamentosCase = new DeletePagamentoCase(prismaPagamentoRepository); */
  const deletePagamentoController = new DeletePagamentoController();

  return deletePagamentoController;
};
