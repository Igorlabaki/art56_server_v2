import { IValueRepository } from "../../../repository/IValueRepository";

class GetValueByIdCase {
  constructor(private valueRepository: IValueRepository) {}

  async execute(ValueId: string) {
    const isValueExist = await this.valueRepository.getById(ValueId);

    if (!isValueExist) {
      const error: Error = {
        name:"Error",
        message: 'This value dont exist.',
      };

      throw error;
    }

    return isValueExist;
  }
}

export { GetValueByIdCase };
