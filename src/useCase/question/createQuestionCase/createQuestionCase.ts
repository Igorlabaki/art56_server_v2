import {
  IQuestionParams,
  IQuestionRepository,
} from "../../../repository/IQuestionRepository";
import { validateInput } from "../../../util/validateInput";

class CreateQuestionCase {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute({question,response}: IQuestionParams) {

    // Validate input
    validateInput([!!question, !!response]);

    const validateIfExistQuestion = await this.questionRepository.getByQuestion(question);

    if (validateIfExistQuestion) {
      const error: Error = {
        name:"Error",
        message: 'This question already exists.',
      };

      throw error;
    }

    const newQuestion = await this.questionRepository.create({question, response});

    return newQuestion;
  }
}

export { CreateQuestionCase };
