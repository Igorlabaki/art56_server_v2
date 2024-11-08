import { ListPagamentoController } from "./listPagamentoController";

export const listPagamentoFactory = () => {
  /*  const prismaImageRepository = new PrismaPagamentoRepository(prismaClient);
  const listPagamentoCase = new ListPagamentosCase(prismaImageRepository); */
  const listPagamentoController = new ListPagamentoController();

  return listPagamentoController;
};
