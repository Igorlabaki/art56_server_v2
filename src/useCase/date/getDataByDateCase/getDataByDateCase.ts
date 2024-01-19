import { GetByDateParams, IDateEventRepository } from "../../../repository/IDateEventRepository";


class GetDateEventByDateCase {
  constructor(private dataRepository: IDateEventRepository) {}

  async execute(date: GetByDateParams) {
    const dataById = await this.dataRepository.getByDate(date);

    return dataById;
  }
}

export { GetDateEventByDateCase };
