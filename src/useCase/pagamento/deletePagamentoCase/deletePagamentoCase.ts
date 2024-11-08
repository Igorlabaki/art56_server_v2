import { IPagamentoRepository } from "../../../repository/IPagamentoRepository";

class DeletePagamentoCase {
  constructor(private pagamentoRepository: IPagamentoRepository) {}

  async execute(reference: string) {

    const validateIfExistPagamentoExist = await this.pagamentoRepository.getById(reference);

    if (!validateIfExistPagamentoExist) {
      const error: Error = {
        name:"Error",
        message: 'Esse pagamento nao existe.',
      };

      throw error;
    }

    const deletePagamento = await this.pagamentoRepository.delete(reference);

    return deletePagamento;
  }
}

export { DeletePagamentoCase };
