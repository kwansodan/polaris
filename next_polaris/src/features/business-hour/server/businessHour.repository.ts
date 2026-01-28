import { prisma } from "@/lib/prisma";
import { BusinessHourInput } from "../utils/validation";

export class BusinessHourRepository {

  upsert(dto: BusinessHourInput) {
    return prisma.businessHour.upsert({
      where: { dayOfWeek: dto.dayOfWeek },
      update: {
        startTime: dto.startTime,
        endTime: dto.endTime,
        isOpen: dto.isOpen,
      },
      create: {
        dayOfWeek: dto.dayOfWeek,
        startTime: dto.startTime,
        endTime: dto.endTime,
        isOpen: dto.isOpen,
      },
    });
  }

  getAll() {
    return prisma.businessHour.findMany({
      orderBy: { dayOfWeek: "asc" },
    });
  }

  findByDayOfWeek(dayOfWeek: number) {
    return prisma.businessHour.findUnique({
      where: { dayOfWeek },
    });
  }

  deleteByDayOfWeek(dayOfWeek: number) {
    return prisma.businessHour.delete({
      where: { dayOfWeek },
    });
  }
}

export const businessHourRepository = new BusinessHourRepository();
