import { IValueRepository, IUpdateValueParams } from '@/backend/repository/IValueRepository';
import { ErrorMessage } from '@/types';

class UpdateValueCase {
  constructor(private ValueRepository: IValueRepository) {}

  async execute({ data, valueId }: IUpdateValueParams) {
    const updateValue = await this.ValueRepository.update({ valueId, data });

    return updateValue;
  }
}

export { UpdateValueCase };
