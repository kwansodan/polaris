import { prisma } from "@/lib/prisma";
import { BlockedDateInput } from "../utils/validation";

export class BlockedDateRepository {

  upsert(dto: BlockedDateInput) {
    const dateObj = new Date(dto.date);

    return prisma.blockedDate.upsert({
      where: { date: dateObj },
      update: {
        reason: dto.reason,
      },
      create: {
        date: dateObj,
        reason: dto.reason,
      },
    });
  }

  getAll() {
    return prisma.blockedDate.findMany({
      orderBy: { date: "asc" },
    });
  }

  findByDate(date: string) {
    return prisma.blockedDate.findUnique({
      where: { date: new Date(date) },
    });
  }

  deleteByDate(date: string) {
    return prisma.blockedDate.delete({
      where: { date: new Date(date) },
    });
  }
}

export const blockedDateRepository = new BlockedDateRepository();
