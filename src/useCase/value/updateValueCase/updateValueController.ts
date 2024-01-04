import { UpdateValueCase } from './updateValueCase';

import { IUpdateValueParams } from '@/backend/repository/IValueRepository';

class UpdateValueController {
  constructor(private updateValueCase: UpdateValueCase) {}

  async handle(data: IUpdateValueParams) {
    const updateValue = await this.updateValueCase.execute(data);

    return updateValue;
  }
}

export { UpdateValueController };
