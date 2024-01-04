import { IValueRepository } from "../../../repository/IValueRepository";

class ListValuesCase {
  constructor(private valueRepository: IValueRepository) {}

  async execute(query: string | undefined) {
    const valueList = await this.valueRepository.list(query);

    return valueList;
  }
}

export { ListValuesCase };
