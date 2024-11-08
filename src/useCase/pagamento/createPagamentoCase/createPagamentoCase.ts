import { Orcamento } from "@prisma/client";
import { IOrcamentoRepository } from "../../../repository/IOrcamentoRepository";
import { IPagamentoParams, IPagamentoRepository } from "../../../repository/IPagamentoRepository";


class CreatePagamentoCase {
  constructor(private pagamentoRepository: IPagamentoRepository,private orcamentoRepository: IOrcamentoRepository) {}
  async execute(data: IPagamentoParams) {
    const entityExists   = await this.orcamentoRepository.getById(data.orcamentoId);

    if (!entityExists) {
      const error = new Error();
      error.message = 'Nao exite esse orcamento.';
      throw error;
    }

    if (entityExists.pago) {
      const error = new Error();
      error.message = 'Este orcamento ja foi pago.';
      throw error;
    }

    if((entityExists.valorPago || 0) + data.value > entityExists.total){
      const error = new Error();
      error.message = 'O valor supera o valor total do orcamento.';
      throw error;
    }

    const newPagamento = await this.pagamentoRepository.create(data);

    if((entityExists.valorPago || 0) + data.value === entityExists.total){
      await this.orcamentoRepository.update({
        data:{
          pago: true,
          valorPago: newPagamento?.value
        },
        orcamentoId: entityExists?.id
      })
    }else{
      await this.orcamentoRepository.update({
        data:{
          valorPago: (newPagamento?.value || 0) + (entityExists?.valorPago || 0)
        },
        orcamentoId: entityExists?.id
      })
    }

    return newPagamento;
  }
}

export { CreatePagamentoCase };
