import { GetPagamentoByOrcamentoController } from "./getPagamentoByOrcamentoController";

export const getPagamentoByOrcamentoFactory = () => {
  /*   const prismaPagamentoRepository = new PrismaPagamentoRepository(prismaClient);
  const getPagamentoByOrcamentoCase = new GetPagamentoByOrcamentoCase(prismaPagamentoRepository); */
  const getPagamentoByOrcamentoController =
    new GetPagamentoByOrcamentoController();

  return getPagamentoByOrcamentoController;
};
