import { IOrcamentoRepository, ListOrcamentoParams, MonthCountParams } from "../../../repository/IOrcamentoRepository";

class GetTrafegoCountCase {
  constructor(private orcamentoRepository: IOrcamentoRepository) {}

  async execute(data: MonthCountParams) {
    const trafegoCount = await this.orcamentoRepository.trafegoCount(data);

    return trafegoCount;
  }
}

export { GetTrafegoCountCase };
