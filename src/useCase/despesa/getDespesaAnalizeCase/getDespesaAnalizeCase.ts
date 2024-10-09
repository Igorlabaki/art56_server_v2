import { IAnalizeDespesasParams, IDespesaRepository } from "../../../repository/IDespesaRepository";

class GetDepesaAnalizeCase {
  constructor(private depesaRepository: IDespesaRepository) {}

  async execute(year: IAnalizeDespesasParams) {
    const depesaAnalize = await this.depesaRepository.getAnalize(year);

    return depesaAnalize;
  }
}

export { GetDepesaAnalizeCase };
