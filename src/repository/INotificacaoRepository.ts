import { Notification } from '@prisma/client';

export interface INotificationParams {
  content: string;
  orcamentoId?: string;
  type:  "VISITA" | "EVENTO" | "ALERTA" | "ORCAMENTO"
  isRead?: boolean;
}

export interface IUpdateNotificationParams {
  notificationId: string;
  data: {
    content: string;
    orcamentoId: string;
    type:  "VISITA" | "EVENTO" | "ALERTA" | "ORCAMENTO"
    isRead: boolean;
  };
}

export interface INotificationRepository {
  delete: (reference: string) => Promise<Notification | null>;
  getById: (reference: string) => Promise<Notification | null>;
  create: (reference: INotificationParams) => Promise<Notification | null>;
  list: (reference: string | undefined) => Promise<Notification[] | null>;
  update: (reference: IUpdateNotificationParams) => Promise<Notification | null>;
}
