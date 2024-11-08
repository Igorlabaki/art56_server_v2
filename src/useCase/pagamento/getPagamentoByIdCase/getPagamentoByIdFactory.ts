import { GetPagamentoByIdController } from './getPagamentoByIdController';

export const getPagamentoByIdFactory = () => {
/*   const prismaPagamentoRepository = new PrismaPagamentoRepository(prismaClient);
  const getPagamentoByIdCase = new GetPagamentoByIdCase(prismaPagamentoRepository); */
  const getPagamentoByIdController = new GetPagamentoByIdController();

  return getPagamentoByIdController;
};
