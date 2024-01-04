import { IValueRepository } from "../../../repository/IValueRepository";

class GetValueByTituloCase {
  constructor(private valueRepository: IValueRepository) {}

  async execute(ValueTitulo: string) {
    const isValueExist = await this.valueRepository.getByTitulo(ValueTitulo);

    if (!isValueExist) {
      const error: Error = {
        name:"Error",
        message: 'This value dont exist.',
      };

      throw error;
    }

    return isValueExist;
  }
}

export { GetValueByTituloCase };
