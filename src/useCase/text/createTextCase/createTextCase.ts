import { ITextParams, ITextRepository } from "../../../repository/ITextRepository";

class CreateTextCase {
  constructor(private textRepository: ITextRepository) {}

  async execute(data: ITextParams) {
    const entityExists = await this.textRepository.validateText({ ...data });

    if (entityExists) {
      const error = new Error();
      error.message = "Ja existe um texto com esse titulo nesta area.";
      return error;
    }

    const newText = await this.textRepository.create(data);

    return newText;
  }
}

export { CreateTextCase };
