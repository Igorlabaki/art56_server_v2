import { IDespesaRepository } from "../../../repository/IDespesaRepository";

class GetDepesaAnalizeCase {
  constructor(private depesaRepository: IDespesaRepository) {}

  async execute() {
    const depesaAnalize = await this.depesaRepository.getAnalize();

    return depesaAnalize;
  }
}

export { GetDepesaAnalizeCase };
