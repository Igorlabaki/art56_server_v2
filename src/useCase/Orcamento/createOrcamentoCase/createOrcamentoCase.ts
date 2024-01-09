import { IOrcamentoParams, IOrcamentoRepository } from "../../../repository/IOrcamentoRepository";

class CreateOrcamentoCase {
  constructor(private orcamentoRepository: IOrcamentoRepository) {}

  async execute(data: IOrcamentoParams) {
    const newOrcamento = await this.orcamentoRepository.create(data);

    return newOrcamento;
  }
}

export { CreateOrcamentoCase };
