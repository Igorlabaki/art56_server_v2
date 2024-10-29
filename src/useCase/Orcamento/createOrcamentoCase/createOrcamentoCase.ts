import { format } from "date-fns";
import { INotificationRepository } from "../../../repository/INotificacaoRepository";
import {
  IOrcamentoParams,
  IOrcamentoRepository,
  IOrcamentoRequest,
} from "../../../repository/IOrcamentoRepository";
import { calcNovoTotal } from "../../../functions/calcNovoTotal";
import { IValueRepository } from "../../../repository/IValueRepository";
import { calcTotal } from "../../../functions/calcTotal";

class CreateOrcamentoCase {
  constructor(
    private valuesRepository: IValueRepository,
    private orcamentoRepository: IOrcamentoRepository,
    private notificationRepository: INotificationRepository
  ) {}

  async execute(orcamentoRequest: IOrcamentoRequest) {
    const valueList = await this.valuesRepository.list(undefined);

    if (orcamentoRequest.total === 0 && valueList) {
      const { dataFim, diaria, inicial, qtdHorasExtras, valorHoraExtra } =
        calcTotal({
          data: {
            valueList: valueList,
            convidados: orcamentoRequest.convidados,
            dataInicio: orcamentoRequest.data,
            horarioFim: orcamentoRequest.horarioFim,
            horarioInicio: orcamentoRequest.horarioInicio,
            limpeza: orcamentoRequest.limpeza,
            recepcionista: orcamentoRequest.recepcionista,
            seguranca: orcamentoRequest.seguranca,
          },
          separador: "/",
        });
      
      const {data, ...rest } = orcamentoRequest  
      const createOrcParam: IOrcamentoParams = {
        dataFim: dataFim,
        dataInicio: inicial,
        valorBase: diaria,
        qtdHorasExtras,
        valorHoraExtra,
        ...rest,
      };

      const newOrcamento = await this.orcamentoRepository.create(
        createOrcParam
      );

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
            newOrcamento?.dataInicio,
            "dd/MM/yyyy"
          )}`,
          type: "ORCAMENTO",
        });
      }

      return newOrcamento;
    } else if (valueList) {
      const {
        final,
        diaria,
        inicial,
        novoTotal,
        qtdHorasExtras,
        valorHoraExtra,
      } = calcNovoTotal({
        data: {
          valueList: valueList,
          convidados: orcamentoRequest.convidados,
          dataInicio: orcamentoRequest.data,
          horarioFim: orcamentoRequest.horarioFim,
          horarioInicio: orcamentoRequest.horarioInicio,
          limpeza: orcamentoRequest.limpeza,
          recepcionista: orcamentoRequest.recepcionista,
          seguranca: orcamentoRequest.seguranca,
          total: orcamentoRequest.total,
        },
        separador: "/",
      });

      const createOrcParam: IOrcamentoParams = {
        ...orcamentoRequest,
        dataFim: final,
        qtdHorasExtras,
        valorHoraExtra,
        total: novoTotal,
        valorBase: diaria,
        dataInicio: inicial,
      };

      const newOrcamento = await this.orcamentoRepository.create(
        createOrcParam
      );

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
            newOrcamento?.dataInicio,
            "dd/MM/yyyy"
          )}`,
          type: "ORCAMENTO",
        });
      }

      return newOrcamento;
    }
  }
}

export { CreateOrcamentoCase };
