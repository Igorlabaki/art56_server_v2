import { IOrcamentoRepository } from "../../../repository/IOrcamentoRepository";

class GetOrcamentoByIdCase {
  constructor(private orcamentoRepository: IOrcamentoRepository) {}

  async execute(orcamentoId: string) {
    const orcamentoById = await this.orcamentoRepository.getById(orcamentoId);

    return orcamentoById;
  }
}

export { GetOrcamentoByIdCase };
