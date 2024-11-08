import { IUpdatePagamentoParams, IPagamentoRepository } from "../../../repository/IPagamentoRepository";

class UpdatePagamentoCase {
  constructor(private pagamentoRepository: IPagamentoRepository) {}

  async execute({ data, pagamentoId }: IUpdatePagamentoParams) {
    const updatePagamento = await this.pagamentoRepository.update({ pagamentoId, data });

    return updatePagamento;
  }
}

export { UpdatePagamentoCase };
