import { UpdatePagamentoController } from "./updatePagamentoController";

export const updatePagamentoFactory = () => {
  /*   const prismaPagamentoRepository = new PrismaPagamentoRepository(prismaClient);
  const updatePagamentosCase = new UpdatePagamentoCase(prismaPagamentoRepository); */
  const updatePagamentoController = new UpdatePagamentoController();

  return updatePagamentoController;
};
