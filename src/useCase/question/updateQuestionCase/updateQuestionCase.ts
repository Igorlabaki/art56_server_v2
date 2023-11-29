import { IQuestionRepository, IUpdateQuestionParams } from "../../../repository/IQuestionRepository";


class UpdateQuestionCase {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute({ data, questionId }: IUpdateQuestionParams) {
    const validateIfExistQuestionAreaPosition = await this.questionRepository.getByQuestion(data.question);

    if (validateIfExistQuestionAreaPosition) {
      const error: Error = {
        name:"Error",
        message: 'This question already exists.',
      };

      throw error;
    }

    const updateQuestion = await this.questionRepository.update({ questionId, data });

    return updateQuestion;
  }
}

export { UpdateQuestionCase };
