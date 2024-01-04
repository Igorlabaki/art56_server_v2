import { IValueRepository } from "../../../repository/IValueRepository";

class DeleteValueCase {
  constructor(private valueRepository: IValueRepository) {}

  async execute(reference: string) {

    const validateIfExistValueExist = await this.valueRepository.getById(reference);

    if (!validateIfExistValueExist) {
      const error: Error = {
        name:"Error",
        message: 'This value dont exist.',
      };

      throw error;
    }

    const deleteValue = await this.valueRepository.delete(reference);

    return deleteValue;
  }
}

export { DeleteValueCase };
