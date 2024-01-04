import { IValueRepository } from '@/backend/repository/IValueRepository';

class GetValueByTituloCase {
  constructor(private valueRepository: IValueRepository) {}

  async execute(Titulo: string) {
    const valueByTitulo = await this.valueRepository.getByTitulo(Titulo);

    return valueByTitulo;
  }
}

export { GetValueByTituloCase };
