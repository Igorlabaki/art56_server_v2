import { IQuestionRepository } from "../../../repository/IQuestionRepository";

class GetByQuestionCase {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute(question: string) {
    const questionByQuestion = await this.questionRepository.getByQuestion(question);

    if (!questionByQuestion) {
      const error: Error = {
        name:"Error",
        message: 'There is no question with this words.',
      };

      throw error;
    }

    return questionByQuestion;
  }
}

export { GetByQuestionCase };
