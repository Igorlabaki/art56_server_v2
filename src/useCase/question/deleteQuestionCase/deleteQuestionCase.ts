import { IQuestionRepository } from "../../../repository/IQuestionRepository";

class DeleteQuestionCase {
  constructor(private QuestionRepository: IQuestionRepository) {}

  async execute(reference: string) {

    const validateIfExistQuestionExist = await this.QuestionRepository.getById(reference);

    if (!validateIfExistQuestionExist) {
      const error: Error = {
        name:"Error",
        message: 'This question dont exist.',
      };

      throw error;
    }

    const deleteQuestion = await this.QuestionRepository.delete(reference);

    return deleteQuestion;
  }
}

export { DeleteQuestionCase };
