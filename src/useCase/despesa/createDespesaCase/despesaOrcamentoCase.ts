import { IDespesaParams, IDespesaRepository } from "../../../repository/IDespesaRepository";

class CreateDespesaCase {
  constructor(private DespesaRepository: IDespesaRepository) {}

  async execute(data: IDespesaParams) {
    const newDespesa = await this.DespesaRepository.create(data);

    return newDespesa;
  }
}

export { CreateDespesaCase };
