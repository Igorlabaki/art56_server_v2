import { GetValueByIdCase } from './getValueByIdCase';

class GetValueByIdController {
  constructor(private getValueByIdCase: GetValueByIdCase) {}

  async handle(reference: string) {
    const valueById = await this.getValueByIdCase.execute(reference);

    return valueById;
  }
}

export { GetValueByIdController };
