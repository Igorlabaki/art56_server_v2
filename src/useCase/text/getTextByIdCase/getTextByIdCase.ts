import { ITextRepository } from "../../../repository/ITextRepository";

class GetTextByIdCase {
  constructor(private textRepository: ITextRepository) {}

  async execute(textId: string) {
    const textById = await this.textRepository.getById(textId);

    return textById;
  }
}

export { GetTextByIdCase };
