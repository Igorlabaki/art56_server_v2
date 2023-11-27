import { ITextRepository, IUpdateTextParams } from "../../../repository/ITextRepository";


class UpdateTextCase {
  constructor(private textRepository: ITextRepository) {}

  async execute({ data, textId }: IUpdateTextParams) {
    const validateIfExistTextAreaPosition = await this.textRepository.validateIfExistTextAreaPosition({textId, area: data.area, position: data.position});
    const validateIfExistTextAreaTitle = await this.textRepository.validateIfExistTextAreaTitle({textId, area: data.area, titulo: data.titulo});

    if (validateIfExistTextAreaPosition) {
      const error: Error = {
        name:"Error",
        message: 'This area already has a text in this position.',
      };

      throw error;
    }

    if (validateIfExistTextAreaTitle) {
      const error: Error = {
        name:"Error",
        message: 'This area already has a text with this title.',
      };

      throw error;
    }

    const updateText = await this.textRepository.update({ textId, data });

    return updateText;
  }
}

export { UpdateTextCase };
