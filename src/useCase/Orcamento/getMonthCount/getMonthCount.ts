import { IOrcamentoRepository, ListOrcamentoParams } from "../../../repository/IOrcamentoRepository";

class GetMonthCountCase {
  constructor(private orcamentoRepository: IOrcamentoRepository) {}

  async execute() {
    const monthCount = await this.orcamentoRepository.monthCount();

    return monthCount;
  }
}

export { GetMonthCountCase };
