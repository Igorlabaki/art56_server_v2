import { ITextRepository } from "../../../repository/ITextRepository";

class DeleteTextCase {
  constructor(private textRepository: ITextRepository) {}

  async execute(reference: string) {

    const validateIfExistTextExist = await this.textRepository.getById(reference);

    if (!validateIfExistTextExist) {
      const error: Error = {
        name:"Error",
        message: 'This text dont exist.',
      };

      throw error;
    }

    const deleteText = await this.textRepository.delete(reference);

    return deleteText;
  }
}

export { DeleteTextCase };
