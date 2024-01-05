import { IImageRepository, IUpdateImageParams } from "../../../repository/ImageRepository";

class UpdateImageCase {
  constructor(private ImageRepository: IImageRepository) {}

  async execute({ data, imageId }: IUpdateImageParams) {
    /* const entityExists = await this.ImageRepository.validateImage({...data}) */
    /* 
        if(entityExists){
            const error : ErrorMessage = {
                errorMessage: "Ja existe um valor com este titulo."
            }

            return error
        } */

    const updateImage = await this.ImageRepository.update({ imageId, data });

    return updateImage;
  }
}

export { UpdateImageCase };
