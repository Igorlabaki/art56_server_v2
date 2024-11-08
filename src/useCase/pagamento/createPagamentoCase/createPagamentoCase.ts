import { IPagamentoParams, IPagamentoRepository } from "../../../repository/IPagamentoRepository";


class CreatePagamentoCase {
  constructor(private pagamentoRepository: IPagamentoRepository) {}
  async execute(data: IPagamentoParams) {
    const entityExists = await this.pagamentoRepository.getByOrcamentoId(data.orcamentoId);

    if (entityExists) {
      const error = new Error();
      error.message = 'Nao exite esse orcamento.';
      throw error;
    }

    const newPagamento = await this.pagamentoRepository.create(data);

    return newPagamento;
  }
}

export { CreatePagamentoCase };
