import { DeleteValueCase } from './deleteValueCase';

class DeleteValueController {
  constructor(private deleteValueCase: DeleteValueCase) {}

  async handle(reference: string) {
    const deleteValue = await this.deleteValueCase.execute(reference);

    return deleteValue;
  }
}

export { DeleteValueController };
