import { Despesa } from "@prisma/client";
import {
  IDespesaRepository,
  IListByCategoriaDespesasParams,
} from "../../../repository/IDespesaRepository";

interface DespesaListState {
  recorrentes: {
    total: number;
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
        total: 0,
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
          despesaListState.recorrentes.total += despesa.valor;
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
