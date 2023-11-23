import { ITextRepository } from "../../../repository/ITextRepository";

class GetTextByAreaCase {
  constructor(private textRepository: ITextRepository) {}

  async execute(area: string) {
    const textByArea = await this.textRepository.getByArea(area);

    return textByArea;
  }
}

export { GetTextByAreaCase };
