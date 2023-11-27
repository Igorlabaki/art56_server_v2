import { ITextRepository } from "../../../repository/ITextRepository";

class GetTextByIdCase {
  constructor(private textRepository: ITextRepository) {}

  async execute(textId: string) {
    const validateIfExistTextExist = await this.textRepository.getById(textId);

    if (!validateIfExistTextExist) {
      const error: Error = {
        name:"Error",
        message: 'This text dont exist.',
      };

      throw error;
    }

    return validateIfExistTextExist;
  }
}

export { GetTextByIdCase };
