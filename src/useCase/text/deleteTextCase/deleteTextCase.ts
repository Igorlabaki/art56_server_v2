import { ITextRepository } from "../../../repository/ITextRepository";

class DeleteTextCase {
  constructor(private textRepository: ITextRepository) {}

  async execute(reference: string) {
    const deleteText = await this.textRepository.delete(reference);

    return deleteText;
  }
}

export { DeleteTextCase };
