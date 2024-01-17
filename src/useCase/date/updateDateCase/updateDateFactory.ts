import { UpdateDateEventController } from "./updateDateController";

export const updateDateEventFactory = () => {
  /*   const prismaDateEventRepository = new PrismaDateEventRepository(prismaClient);
  const updateDateEventsCase = new UpdateDateEventCase(prismaDateEventRepository); */
  const updateDateEventController = new UpdateDateEventController();

  return updateDateEventController;
};
