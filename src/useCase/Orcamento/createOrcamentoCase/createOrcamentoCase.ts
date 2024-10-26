import { format } from "date-fns";
import { INotificationRepository } from "../../../repository/INotificacaoRepository";
import {
  IOrcamentoParams,
  IOrcamentoRepository,
} from "../../../repository/IOrcamentoRepository";

class CreateOrcamentoCase {
  constructor(
    private orcamentoRepository: IOrcamentoRepository,
    private notificationRepository: INotificationRepository
  ) {}

  async execute(data: IOrcamentoParams) {
    const newOrcamento = await this.orcamentoRepository.create(data);

    if (newOrcamento) {
      await this.notificationRepository.create({
        orcamentoId: newOrcamento.id,
        content: `Novo orcamento do(a) ${
          newOrcamento.nome
        } no valor de ${new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(newOrcamento.total)}, para data  ${format(
          data?.dataInicio,
          "dd/MM/yyyy"
        )}`,
        type: "ORCAMENTO",
      });
    }

    return newOrcamento;
  }
}

export { CreateOrcamentoCase };
