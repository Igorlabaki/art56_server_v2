import { IOrcamentoRepository, UpdateOrcamentoParams } from "../../../repository/IOrcamentoRepository";

class UpdateOrcamentoCase {
  constructor(private orcamentoRepository: IOrcamentoRepository) {}

  async execute(data: UpdateOrcamentoParams) {
    const updateOrcamento = await this.orcamentoRepository.update(data);

    return updateOrcamento;
  }
}

export { UpdateOrcamentoCase };
