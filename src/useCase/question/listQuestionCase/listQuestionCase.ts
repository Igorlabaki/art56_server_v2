import { IQuestionRepository } from '../../../repository/IQuestionRepository';

class ListQuestionCase {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute(query: string | undefined) {
    const questionList = await this.questionRepository.list(query);

    return questionList;
  }
}

export { ListQuestionCase };
