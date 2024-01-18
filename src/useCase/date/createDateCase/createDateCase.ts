
import { format } from "date-fns";
import { IDateEventParams, IDateEventRepository } from "../../../repository/IDateEventRepository";

class CreateDateEventCase {
  constructor(private dateRepository: IDateEventRepository) {}
  async execute(data: IDateEventParams) {
    
    const newDate = await this.dateRepository.create(data);

    return newDate;
  }
}

export { CreateDateEventCase };
