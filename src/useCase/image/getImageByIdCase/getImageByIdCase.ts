import { IImageRepository } from "../../../repository/ImageRepository";

class GetImageByIdCase {
  constructor(private imageRepository: IImageRepository) {}

  async execute(id: string) {
    const imageById = await this.imageRepository.getById(id);

    return imageById;
  }
}

export { GetImageByIdCase };
