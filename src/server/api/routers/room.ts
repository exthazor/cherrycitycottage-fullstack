import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

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
      const { checkinDate, checkoutDate, noOfGuests, noOfRooms } = input;
      const startDate = new Date(checkinDate);
      const endDate = new Date(checkoutDate);

      if (new Date(checkinDate) >= new Date(checkoutDate)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Check-out date must be after check-in date.",
        });
      }  
  
      // Find all rooms that are not reserved in the given date range
      const availableRooms = await prisma.room.findMany({
        where: {
          reservations: {
            none: {
              OR: [
                {
                  startDate: {
                    lt: endDate,
                  },
                },
                {
                  endDate: {
                    gt: startDate,
                  },
                },
              ],
            },
          },
          AND: {
            isAvailable: true,
          }
        },
        include: {
          roomType: true, // Include room type to get capacity and other details
        },
      });

      // Query to get information about all room types, their prices, and capacities
      const roomTypes = await prisma.roomType.findMany({
        select: {
          name: true,
          capacity: true,
          price: true,
        },
        orderBy: {
          price: "asc",
        }
      });

      const roomCountsByType: { [key: string]: { count: number, roomType: any } } = availableRooms.reduce((acc, room) => {
        const { roomType } = room;
        if (!acc[roomType.name]) {
          acc[roomType.name] = { count: 0, roomType: room.roomType };
        }
        acc[roomType.name]!!.count += 1;
        return acc;
      }, {} as { [key: string]: { count: number, roomType: any } });
      

      const response = {
        availableRooms: Object.values(roomCountsByType).map(({ count, roomType }) => ({
          id: roomType.id, // This will need adjustment as id might not be directly available
          roomType: roomType.name,
          capacity: roomType.capacity,
          price: roomType.price,
          count: count,
        })),
        roomTypes: roomTypes,
      };
      
      return response;
    })
})