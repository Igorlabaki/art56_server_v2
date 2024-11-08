import { IPagamentoRepository } from "../../../repository/IPagamentoRepository";

class GetPagamentoByOrcamentoCase {
  constructor(private pagamentoRepository: IPagamentoRepository) {}

  async execute(orcamentoId: string) {
    const isPagamentoExist = await this.pagamentoRepository.getByOrcamentoId(orcamentoId);

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

export { GetPagamentoByOrcamentoCase };
