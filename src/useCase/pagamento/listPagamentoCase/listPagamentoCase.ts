import { IPagamentoRepository } from "../../../repository/IPagamentoRepository";

class ListPagamentosCase {
  constructor(private pagamentoRepository: IPagamentoRepository) {}

  async execute(query: string | undefined) {
    const pagamentoList = await this.pagamentoRepository.list(query);

    return pagamentoList;
  }
}

export { ListPagamentosCase };
