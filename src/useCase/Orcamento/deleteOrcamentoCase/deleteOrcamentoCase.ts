import { IOrcamentoRepository } from "../../../repository/IOrcamentoRepository";

class DeleteOrcamentotCase {
  constructor(private orcamentotRepository: IOrcamentoRepository) {}

  async execute(reference: string) {
    const deleteOrcamento = await this.orcamentotRepository.delete(reference);

    return deleteOrcamento;
  }
}

export { DeleteOrcamentotCase };
