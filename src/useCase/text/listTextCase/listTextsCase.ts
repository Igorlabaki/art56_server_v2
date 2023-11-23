import { ITextRepository } from '../../../repository/ITextRepository';

class ListTextsCase {
  constructor(private textRepository: ITextRepository) {}

  async execute() {
    const textList = await this.textRepository.list();

    return textList;
  }
}

export { ListTextsCase };
