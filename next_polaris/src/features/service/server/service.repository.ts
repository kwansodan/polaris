import { prisma } from "@/lib/prisma";
import { Prisma, Service } from "@generated/prisma/client";
import { ServiceUpsertInput } from "../utils/validation";

export class ServiceRepository {

  async getAllServices(where: Prisma.ServiceWhereInput) {
    return prisma.service.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      }
    })
  }

  async findById(id: string) {
    return prisma.service.findUnique({
      where: {
        id
      }
    })
  }

  async deleteById(id: string) {
    return prisma.service.delete({
      where: {
        id
      }
    })
  }

  async upsertService(upsertDTO: ServiceUpsertInput): Promise<Service> {

    const upsertedService = await prisma.service.upsert({
      where: {
        id: upsertDTO.id,
      },
      update: {
        name: upsertDTO.name,
        description: upsertDTO.description,
        durationMinutes: upsertDTO.durationMinutes,
        price: upsertDTO.price,
        currency: upsertDTO.currency,
        isActive: upsertDTO.isActive,
      },
      create: {
        name: upsertDTO.name,
        description: upsertDTO.description,
        durationMinutes: upsertDTO.durationMinutes,
        price: upsertDTO.price,
        currency: upsertDTO.currency,
        isActive: upsertDTO.isActive,
      }
    })

    return upsertedService
  }
}

export const serviceRepository = new ServiceRepository()