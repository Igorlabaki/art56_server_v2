import {
  IImageParams,
  IImageRepository,
  IListImagesParams,
} from '../../../repository/ImageRepository';

class ListImagesCase {
  constructor(private imageRepository: IImageRepository) {}

  async execute(query: string | undefined) {
    const imageList = await this.imageRepository.list(query);

    return imageList;
  }
}

export { ListImagesCase };
