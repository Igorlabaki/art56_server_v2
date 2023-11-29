import { IQuestionRepository, IUpdateQuestionParams } from "../../../repository/IQuestionRepository";


class UpdateQuestionCase {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute({ data, questionId }: IUpdateQuestionParams) {
    const questionById = await this.questionRepository.getById(questionId);

    if (!questionById) {
      const error: Error = {
        name:"Error",
        message: 'This question dont exists.',
      };

      throw error;
    }else{
      const validateIfExistQuestionAreaPosition = await this.questionRepository.validateQuestion({question: data.question, questionId: questionById.id});
  
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
}

export { UpdateQuestionCase };
