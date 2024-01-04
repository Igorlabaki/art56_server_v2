import { GetValueByTituloCase } from './getValueByTituloCase';

class GetValueByTituloController {
  constructor(private getValueByTituloCase: GetValueByTituloCase) {}

  async handle(reference: string) {
    const valueByTitulo = await this.getValueByTituloCase.execute(reference);

    return valueByTitulo;
  }
}

export { GetValueByTituloController };
