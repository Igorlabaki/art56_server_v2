import { ITextRepository } from "../../../repository/ITextRepository";

class GetTextByAreaCase {
  constructor(private textRepository: ITextRepository) {}

  async execute(area: string) {
    const textByArea = await this.textRepository.getByArea(area);

    if (textByArea) {
      const error: Error = {
        name:"Error",
        message: 'There is no text in this area.',
      };

      throw error;
    }

    return textByArea;
  }
}

export { GetTextByAreaCase };
