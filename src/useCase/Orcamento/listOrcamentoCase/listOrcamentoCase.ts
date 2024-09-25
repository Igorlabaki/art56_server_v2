import { IOrcamentoRepository, ListOrcamentoParams } from "../../../repository/IOrcamentoRepository";

class ListOrcamentoCase {
  constructor(private orcamentoRepository: IOrcamentoRepository) {}

  async execute(query :ListOrcamentoParams) {
    const orcamentoList = await this.orcamentoRepository.list(query);

    return orcamentoList;
  }
}

export { ListOrcamentoCase };
