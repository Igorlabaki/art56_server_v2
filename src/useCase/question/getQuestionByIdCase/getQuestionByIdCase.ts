import { IQuestionRepository } from "../../../repository/IQuestionRepository";

class GetQuestionByIdCase {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute(questionId: string) {
    const validateIfExistQuestionExist = await this.questionRepository.getById(questionId);

    if (!validateIfExistQuestionExist) {
      const error: Error = {
        name:"Error",
        message: 'This question dont exist.',
      };

      throw error;
    }

    return validateIfExistQuestionExist;
  }
}

export { GetQuestionByIdCase };
