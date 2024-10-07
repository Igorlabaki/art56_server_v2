import { IDespesaRepository } from "../../../repository/IDespesaRepository";

class ListDespesaCase {
  constructor(private despesaRepository: IDespesaRepository) {}

  async execute(query: string | undefined) {
    const despesaList = await this.despesaRepository.list(query);

    return despesaList;
  }
}

export { ListDespesaCase };
