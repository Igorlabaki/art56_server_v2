import { calcNovoTotal } from "../../../functions/calcNovoTotal";
import { transformDate } from "../../../functions/transformData";
import {
  IOrcamentoParams,
  IOrcamentoRepository,
  IOrcamentoUpdateRequest,
  UpdateOrcamentoParams,
} from "../../../repository/IOrcamentoRepository";
import { IValueRepository } from "../../../repository/IValueRepository";

class UpdateOrcamentoCase {
  constructor(
    private orcamentoRepository: IOrcamentoRepository,
    private valuesRepository: IValueRepository
  ) {}

  async execute(updateOrcamentoParams: IOrcamentoUpdateRequest) {
    const valueList = await this.valuesRepository.list(undefined);

    const orcacamento = await this.orcamentoRepository.getById(
      updateOrcamentoParams.orcamentoId
    );

    if (!orcacamento) {
      return;
    }

    if (!valueList) {
      return;
    }

    if (updateOrcamentoParams.data.total === orcacamento?.total) {
      const { dataFinal, dataInicial } = transformDate({
        separador: "/",
        dataInicio: updateOrcamentoParams?.data?.data as string,
        horarioFim: updateOrcamentoParams?.data?.horarioFim,
        horarioInicio: updateOrcamentoParams?.data?.horarioInicio,
      });

      const final = new Date(dataFinal.toDate());
      const inicial = new Date(dataInicial.toDate());

      const updatedOrcamento = await this.orcamentoRepository.update({
        orcamentoId: updateOrcamentoParams.orcamentoId,
        data: {
          tipo: updateOrcamentoParams.data.tipo,
          nome: updateOrcamentoParams.data.nome,
          email: updateOrcamentoParams.data.email,
          texto: updateOrcamentoParams.data.texto,
          telefone: updateOrcamentoParams.data.telefone,
          dataFim: final?.toISOString(),
          limpeza: updateOrcamentoParams.data.limpeza || false,
          data: inicial?.toISOString(),
          trafegoCanal: updateOrcamentoParams.data.trafegoCanal,
          conheceEspaco: updateOrcamentoParams.data.conheceEspaco,
          seguranca: updateOrcamentoParams.data.seguranca || false,
          convidados: Number(updateOrcamentoParams.data.convidados),
          recepcionista: updateOrcamentoParams.data.recepcionista || false,
        },
      });
      return updatedOrcamento;
    }

    const {
      final,
      diaria,
      inicial,
      novoTotal,
      qtdHorasExtras,
      valorHoraExtra,
    } = calcNovoTotal({
      data: { valueList: valueList, ...updateOrcamentoParams.data },
      separador: "/",
    });

    const updatedOrcamento = await this.orcamentoRepository.update({
      orcamentoId: updateOrcamentoParams.orcamentoId,
      data: {
        feedback: "",
        tipo: "Festa",
        contato: false,
        total: novoTotal,
        valorBase: diaria,
        nome: updateOrcamentoParams.data?.nome,
        email: updateOrcamentoParams.data?.email,
        texto: updateOrcamentoParams.data?.texto,
        telefone: updateOrcamentoParams.data?.telefone,
        dataFim: final?.toISOString(),
        qtdHorasExtras: qtdHorasExtras,
        limpeza: updateOrcamentoParams.data?.limpeza || false,
        data: inicial?.toISOString(),
        trafegoCanal: updateOrcamentoParams.data?.trafegoCanal,
        aprovadoAr756: orcacamento.aprovadoAr756,
        conheceEspaco: updateOrcamentoParams.data?.conheceEspaco,
        seguranca: updateOrcamentoParams.data?.seguranca || false,
        convidados: Number(updateOrcamentoParams.data?.convidados),
        aprovadoCliente: orcacamento.aprovadoCliente,
        recepcionista: updateOrcamentoParams.data?.recepcionista || false,
        valorHoraExtra: novoTotal / 7,
      },
    });
    return updatedOrcamento;
  }
}

export { UpdateOrcamentoCase };
