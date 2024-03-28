import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const prisma = new PrismaClient();

export const roomsRouter = createTRPCRouter({
  findAvailableRooms: publicProcedure
    .input(z.object({
      checkinDate: z.string(),
      checkoutDate: z.string(),
      noOfGuests: z.number(),
      noOfRooms: z.number(),
      promoCode: z.string().optional(),
    }))
    .query(async ({ input }) => {
        const { checkinDate, checkoutDate } = input;

    // Find reservations that overlap with the given date range
    const overlappingReservations = await prisma.reservation.findMany({
      where: {
        OR: [
          {
            startDate: {
              lte: new Date(checkinDate),
            },
            endDate: {
              gte: new Date(checkoutDate),
            },
          },
        ],
      },
      select: {
        roomTypeId: true,
      },
    });

    const unavailableRoomTypeIds = overlappingReservations.map(reservation => reservation.roomTypeId);

    // Find room types excluding the ones with overlapping reservations
    const availableRoomTypes = await prisma.roomType.findMany({
      where: {
        NOT: {
          id: {
            in: unavailableRoomTypeIds,
          },
        },
      },
      include: {
        rooms: true, // Adjust according to the details you need
      },
    });

    // Optionally, you can further process availableRoomTypes to match your exact frontend needs

    return { availableRoomTypes };
  },
    )})