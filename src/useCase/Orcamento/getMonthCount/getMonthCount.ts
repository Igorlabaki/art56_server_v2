import { IOrcamentoRepository, ListOrcamentoParams, MonthCountParams } from "../../../repository/IOrcamentoRepository";

class GetMonthCountCase {
  constructor(private orcamentoRepository: IOrcamentoRepository) {}
  
  async execute(data: MonthCountParams) {

    const monthCount = await this.orcamentoRepository.monthCount(data);

    return monthCount;
  }
}

export { GetMonthCountCase };
