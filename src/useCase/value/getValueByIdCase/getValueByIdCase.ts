import { IValueRepository } from '@/backend/repository/IValueRepository';

class GetValueByIdCase {
  constructor(private valueRepository: IValueRepository) {}

  async execute(id: string) {
    const valueById = await this.valueRepository.getById(id);

    return valueById;
  }
}

export { GetValueByIdCase };
