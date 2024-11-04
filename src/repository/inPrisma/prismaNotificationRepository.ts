import {
  INotificationParams,
  INotificationRepository,
  IUpdateNotificationParams,
} from "../INotificacaoRepository";

import { PrismaClient, Notification } from "@prisma/client";
export class PrismaNotificationRepository implements INotificationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(
    notificationParams: INotificationParams
  ): Promise<Notification | null> {
    return await this.prisma.notification.create({
      data: {
        ...notificationParams,
      },
    });
  }

  async delete(reference: string): Promise<Notification | null> {
    return await this.prisma.notification.delete({
      where: {
        id: reference,
      },
    });
  }

  async getById(reference: string): Promise<Notification | null> {
    return await this.prisma.notification.findFirst({
      where: {
        id: reference,
      },
    });
  }

  async update({
    data,
    notificationId,
  }: IUpdateNotificationParams): Promise<Notification | null> {
    return await this.prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        ...data,
      },
    });
  }

  async list(reference: string | undefined): Promise<Notification[]> {
    const today = new Date();
    return await this.prisma.notification.findMany({
      where: {
        createdAt: {
          gte:  new Date(today.setHours(0, 0, 0, 0)), // maior ou igual a início do dia
          lte:  new Date(today.setHours(23, 59, 59, 999)),   // menor ou igual a fim do dia
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include:{
        orcamento: true,
        dateEvent: {
          select:{
            orcamento: true
          }
        }
      },
    });
  }
}
