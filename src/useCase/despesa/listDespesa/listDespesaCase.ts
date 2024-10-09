import { IDespesaRepository, IListByCategoriaDespesasParams } from "../../../repository/IDespesaRepository";

class ListDespesaCase {
  constructor(private despesaRepository: IDespesaRepository) {}

  async execute(query: IListByCategoriaDespesasParams) {
    const despesaList = await this.despesaRepository.list(query);

    return despesaList;
  }
}

export { ListDespesaCase };
