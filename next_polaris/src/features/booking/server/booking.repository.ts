import { prisma } from "@/lib/prisma";
import { Booking, BookingStatus, PaymentStatus, Prisma } from "@generated/prisma/client";
import { BookingInput } from "../utils/validation";
import { generateBookingReference } from "@/utils/helpers";


export class BookingRepository {

  async upsertBooking(upsertDTO: BookingInput): Promise<Booking> {
    const bookingReference = generateBookingReference()

    const upsertedBooking = await prisma.booking.upsert({
      where: {
        bookingReference: upsertDTO.bookingReference,
      },
      update: {
        bookingReference: upsertDTO.bookingReference,
        clientName: upsertDTO.clientName,
        clientEmail: upsertDTO.clientEmail,
        clientPhone: upsertDTO.clientPhone,

        serviceId: upsertDTO.serviceId,

        bookingDate: new Date(upsertDTO.bookingDate),
        bookingTime: `${new Date(upsertDTO.bookingDate).toISOString().split('T')[0]}T${upsertDTO.bookingTime}:00Z`,

        status: upsertDTO.status,
        paymentStatus: upsertDTO.paymentStatus,
      },
      create: {
        bookingReference: bookingReference,
        clientName: upsertDTO.clientName,
        clientEmail: upsertDTO.clientEmail,
        clientPhone: upsertDTO.clientPhone,

        serviceId: upsertDTO.serviceId,

        bookingDate: new Date(upsertDTO.bookingDate),
        bookingTime: `${new Date(upsertDTO.bookingDate).toISOString().split('T')[0]}T${upsertDTO.bookingTime}:00Z`,

        status: BookingStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
      }
    })

    return upsertedBooking
  }

  async getAllBookings(where?: Prisma.BookingWhereInput): Promise<Booking[]> {
    return prisma.booking.findMany({
      where,
      include: {
        service: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string) {
    return prisma.booking.findUnique({
      where: { id },
      include: {
        service: true,
      },
    })
  }

  async findByReference(reference: string) {
    return prisma.booking.findUnique({
      where: { bookingReference: reference },
      include: {
        service: true,
      },
    })
  }

  async isSlotAvailable(
    date: Date,
    time: string,
    serviceId: string
  ): Promise<boolean> {
    const existingBooking = await prisma.booking.findFirst({
      where: {
        bookingDate: date,
        bookingTime: time,
        serviceId,
        status: {
          in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
        },
      },
    })

    return !existingBooking
  }


  async updateStatus(id: string, status: BookingStatus) {
    return prisma.booking.update({
      where: { id },
      data: { status },
      include: {
        service: true,
      },
    })
  }

  async cancel(id: string) {
    return this.updateStatus(id, BookingStatus.CANCELLED)
  }

  async deleteById(id: string) {
    return prisma.booking.delete({
      where: {
        id
      }
    })
  }
}

export const bookingRepository = new BookingRepository();