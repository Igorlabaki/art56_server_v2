import { IImageRepository } from "../../../repository/ImageRepository";

class DeleteImagetCase {
  constructor(private ImagetRepository: IImageRepository) {}

  async execute(reference: string) {
    const deleteImage = await this.ImagetRepository.delete(reference);

    return deleteImage;
  }
}

export { DeleteImagetCase };
