import { ITextRepository } from '../../../repository/ITextRepository';

class ListTextsCase {
  constructor(private textRepository: ITextRepository) {}

  async execute(query: string | undefined) {
    const textList = await this.textRepository.list(query);

    return textList;
  }
}

export { ListTextsCase };
