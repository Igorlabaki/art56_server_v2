import { IDateEventRepository } from "../../../repository/IDateEventRepository";

class DeleteDateEventCase {
  constructor(private dateEventRepository: IDateEventRepository) {}

  async execute(reference: string) {
    const deleteData = await this.dateEventRepository.delete(reference);

    return deleteData;
  }
}

export { DeleteDateEventCase };
