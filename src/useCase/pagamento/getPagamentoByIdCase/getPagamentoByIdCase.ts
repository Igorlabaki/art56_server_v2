import { IPagamentoRepository } from "../../../repository/IPagamentoRepository";

class GetPagamentoByIdCase {
  constructor(private pagamentoRepository: IPagamentoRepository) {}

  async execute(PagamentoId: string) {
    const isPagamentoExist = await this.pagamentoRepository.getById(PagamentoId);

    if (!isPagamentoExist) {
      const error: Error = {
        name:"Error",
        message: 'This pagamento dont exist.',
      };

      throw error;
    }

    return isPagamentoExist;
  }
}

export { GetPagamentoByIdCase };
