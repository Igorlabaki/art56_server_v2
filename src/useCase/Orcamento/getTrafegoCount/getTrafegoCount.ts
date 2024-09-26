import { IOrcamentoRepository, ListOrcamentoParams } from "../../../repository/IOrcamentoRepository";

class GetTrafegoCountCase {
  constructor(private orcamentoRepository: IOrcamentoRepository) {}

  async execute() {
    const trafegoCount = await this.orcamentoRepository.trafegoCount();

    return trafegoCount;
  }
}

export { GetTrafegoCountCase };
