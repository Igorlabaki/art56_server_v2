import { IOrcamentoRepository, ListOrcamentoParams, MonthCountParams } from "../../../repository/IOrcamentoRepository";

class GetMonthCountCase {
  constructor(private orcamentoRepository: IOrcamentoRepository) {}
  
  async execute(year: MonthCountParams) {

    const monthCount = await this.orcamentoRepository.monthCount(year);

    return monthCount;
  }
}

export { GetMonthCountCase };
