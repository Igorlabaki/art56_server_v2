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
    

    const validateIfExistTextAreaPosition = await this.textRepository.validateIfExistTextAreaPosition({area, position});
    const validateIfExistTextAreaTitle = await this.textRepository.validateIfExistTextAreaTitle({area, titulo});

    if (validateIfExistTextAreaPosition) {
      const error: Error = {
        name:"Error",
        message: 'This area already has a text in this position.',
      };

      throw error;
    }

    if (validateIfExistTextAreaTitle && titulo != undefined) {
      const error: Error = {
        name:"Error",
        message: 'This area already has a text with this title.',
      };

      throw error;
    }

    const newText = await this.textRepository.create({area,position,text,titulo});

    return newText;
  }
}

export { CreateTextCase };
