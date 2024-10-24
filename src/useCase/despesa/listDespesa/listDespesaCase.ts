import { Despesa } from "@prisma/client";
import {
  IDespesaRepository,
  IListByCategoriaDespesasParams,
} from "../../../repository/IDespesaRepository";

interface DespesaListState {
  recorrentes: {
    totalMensal: number;
    totalAnual: number;
    list: Despesa[];
  };
  naoRecorrentes: {
    total: number;
    list: Despesa[];
  };
}
class ListDespesaCase {
  constructor(private despesaRepository: IDespesaRepository) {}

  async execute(query: IListByCategoriaDespesasParams) {
    const despesaList = await this.despesaRepository.list(query);

    const despesaListState : DespesaListState = {
      recorrentes: {
        totalAnual: 0,
        totalMensal: 0,
        list: [],
      },
      naoRecorrentes: {
        total: 0,
        list: [],
      },
    };

    if (despesaList) {
      for (const despesa of despesaList) {
        if (despesa.recorrente) {
          if(despesa.tipo === "Quinzenal"){
            despesaListState.recorrentes.totalMensal += despesa.valor * 2;
            despesaListState.recorrentes.totalAnual += despesa.valor * 24;
          }
          if(despesa.tipo === "Mensal"){
            despesaListState.recorrentes.totalMensal += despesa.valor;
            despesaListState.recorrentes.totalAnual += despesa.valor * 12;
          }
          despesaListState.recorrentes.list.push(despesa);
        } else {
          despesaListState.naoRecorrentes.total += despesa.valor;
          despesaListState.naoRecorrentes.list.push(despesa);
        }
      }
    }

    return despesaListState;
  }
}

export { ListDespesaCase };
