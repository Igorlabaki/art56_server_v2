import { IOrcamentoRepository } from "../../../repository/IOrcamentoRepository";
import { IPagamentoRepository } from "../../../repository/IPagamentoRepository";

class DeletePagamentoCase {
  constructor(private pagamentoRepository: IPagamentoRepository, private orcamentoRepository: IOrcamentoRepository) {}

  async execute(reference: string) {

    const validateIfExistPagamentoExist = await this.pagamentoRepository.getById(reference);

    if (!validateIfExistPagamentoExist) {
      const error: Error = {
        name:"Error",
        message: 'Esse pagamento nao existe.',
      };

      throw error;
    }

    const orcamentoBYId = await this.orcamentoRepository.getById(validateIfExistPagamentoExist.orcamentoId);

    if(orcamentoBYId){
      await this.orcamentoRepository.update({
        data:{
          pago: false,
          valorPago: (orcamentoBYId?.valorPago || 0) - (validateIfExistPagamentoExist?.value || 0),
        },
        orcamentoId: orcamentoBYId.id
      })
    }

    const deletePagamento = await this.pagamentoRepository.delete(reference);

    return deletePagamento;
  }
}

export { DeletePagamentoCase };
