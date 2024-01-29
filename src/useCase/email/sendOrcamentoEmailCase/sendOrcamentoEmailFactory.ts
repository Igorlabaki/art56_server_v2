import { SendOrcamentoEmailController } from './sendOrcamentoEmailController';

export const sendOrcamentoEmailFactory = () => {
  const sendOrcamentoEmailController = new SendOrcamentoEmailController();

  return sendOrcamentoEmailController;
};
