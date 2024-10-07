import { IDespesaRepository } from "../../../repository/IDespesaRepository";

class GetDepesaByIdCase {
  constructor(private depesaRepository: IDespesaRepository) {}

  async execute(id: string) {
    const depesaById = await this.depesaRepository.getById(id);

    return depesaById;
  }
}

export { GetDepesaByIdCase };
