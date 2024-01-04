import { IValueRepository } from '@/backend/repository/IValueRepository';

class DeleteValueCase {
  constructor(private ValueRepository: IValueRepository) {}

  async execute(reference: string) {
    const deleteValue = await this.ValueRepository.delete(reference);

    return deleteValue;
  }
}

export { DeleteValueCase };
