import { IImageRepository, IListByTagImagesParams } from "../../../repository/ImageRepository";

class GetImageByTagCase {
  constructor(private imageRepository: IImageRepository) {}

  async execute(data: IListByTagImagesParams) {
    const imageByTag = await this.imageRepository.getListByTag(data);

    return imageByTag;
  }
}

export { GetImageByTagCase };
