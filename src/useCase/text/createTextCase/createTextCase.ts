import {
  ITextParams,
  ITextRepository,
} from "../../../repository/ITextRepository";
import { validateInput } from "../../../util/validateInput";

class CreateTextCase {
  constructor(private textRepository: ITextRepository) {}

  async execute({area,position,text,titulo}: ITextParams) {

    // Validate input
    validateInput([!!area, !!position, !!text]);

    const entityExists = await this.textRepository.validateText({area,titulo});

    if (entityExists) {
      const error = new Error();
      error.message = "Ja existe um texto com esse titulo nesta area.";
      throw error;
    }

    const newText = await this.textRepository.create({area,position,text,titulo});

    return newText;
  }
}

export { CreateTextCase };
