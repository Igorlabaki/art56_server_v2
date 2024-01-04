import { IValueParams, IValueRepository } from "../../../repository/IValueRepository";


class CreateValueCase {
  constructor(private ValueRepository: IValueRepository) {}
  async execute(data: IValueParams) {
    const entityExists = await this.ValueRepository.validateValue({ ...data });

    if (entityExists) {
      const error = new Error();
      error.message = 'Ja existe um valor com este titulo.';
      throw error;
    }

    const newValue = await this.ValueRepository.create(data);

    return newValue;
  }
}

export { CreateValueCase };
