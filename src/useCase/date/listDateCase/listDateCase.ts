import { IDateEventRepository } from '../../../repository/IDateEventRepository';

class ListDateEventCase {
  constructor(private dateEventRepository: IDateEventRepository) {}

  async execute(query: string | undefined) {
    const orcamentoList = await this.dateEventRepository.list(query);

    return orcamentoList;
  }
}

export { ListDateEventCase };
