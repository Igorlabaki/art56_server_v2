import { SendContratoEmailController } from './sendContratoEmailController';

export const sendContratoEmailFactory = () => {
  const sendContratoEmailController = new SendContratoEmailController();

  return sendContratoEmailController;
};
