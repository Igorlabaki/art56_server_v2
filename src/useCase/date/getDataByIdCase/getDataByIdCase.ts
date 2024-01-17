import { IDateEventRepository } from "../../../repository/IDateEventRepository";


class GetDateEventByIdCase {
  constructor(private dataRepository: IDateEventRepository) {}

  async execute(dateEventId: string) {
    const dataById = await this.dataRepository.getById(dateEventId);

    return dataById;
  }
}

export { GetDateEventByIdCase };
