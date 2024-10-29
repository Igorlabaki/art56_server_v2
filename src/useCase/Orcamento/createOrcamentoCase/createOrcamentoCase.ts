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

  async execute(data: IOrcamentoRequest) {
    const valueList = await this.valuesRepository.list(undefined);

    if (data.total === undefined && valueList) {
      const { dataFim, diaria, inicial, qtdHorasExtras, valorHoraExtra } =
        calcTotal({
          data: {
            valueList: valueList,
            convidados: data.convidados,
            dataInicio: data.data,
            horarioFim: data.horarioFim,
            horarioInicio: data.horarioInicio,
            limpeza: data.limpeza,
            recepcionista: data.recepcionista,
            seguranca: data.seguranca,
          },
          separador: "/",
        });

      const createOrcParam: IOrcamentoParams = {
        dataFim: dataFim,
        dataInicio: inicial,
        valorBase: diaria,
        qtdHorasExtras,
        valorHoraExtra,
        ...data,
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
          convidados: data.convidados,
          dataInicio: data.data,
          horarioFim: data.horarioFim,
          horarioInicio: data.horarioInicio,
          limpeza: data.limpeza,
          recepcionista: data.recepcionista,
          seguranca: data.seguranca,
          total: data.total,
        },
        separador: "/",
      });

      const createOrcParam: IOrcamentoParams = {
        ...data,
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
            data?.data,
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
