import { IDespesaRepository } from "../../../repository/IDespesaRepository";

class DeleteDespesatCase {
  constructor(private despesatRepository: IDespesaRepository) {}

  async execute(reference: string) {
    const deleteDespesa = await this.despesatRepository.delete(reference);

    return deleteDespesa;
  }
}

export { DeleteDespesatCase };
