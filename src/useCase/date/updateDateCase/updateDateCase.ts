import { IDateEventRepository, UpdateDateEventParams } from "../../../repository/IDateEventRepository";

class UpdateDateEventCase {
  constructor(private DateEventRepository: IDateEventRepository) {}

  async execute(data: UpdateDateEventParams) {
    const updateDateEvent = await this.DateEventRepository.update(data);

    return updateDateEvent;
  }
}

export { UpdateDateEventCase };
