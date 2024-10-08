import { IDespesaParams, IDespesaRepository } from "../../../repository/IDespesaRepository";

class CreateDespesaCase {
  constructor(private despesaRepository: IDespesaRepository) {}

  async execute(data: IDespesaParams) {
    const newDespesa = await this.despesaRepository.create(data);

    return newDespesa;
  }
}

export { CreateDespesaCase };
