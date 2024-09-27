import { IOrcamentoRepository, ListOrcamentoParams } from "../../../repository/IOrcamentoRepository";

class ListOrcamentoAprovadoCase {
  constructor(private orcamentoRepository: IOrcamentoRepository) {}

  async execute(query :ListOrcamentoParams) {
    const orcamentoAprovadoList = await this.orcamentoRepository.listAprovado(query);

    return orcamentoAprovadoList;
  }
}

export { ListOrcamentoAprovadoCase };
