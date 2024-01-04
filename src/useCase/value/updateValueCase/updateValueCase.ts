import { IUpdateValueParams, IValueRepository } from "../../../repository/IValueRepository";

class UpdateValueCase {
  constructor(private ValueRepository: IValueRepository) {}

  async execute({ data, valueId }: IUpdateValueParams) {
    const updateValue = await this.ValueRepository.update({ valueId, data });

    return updateValue;
  }
}

export { UpdateValueCase };
