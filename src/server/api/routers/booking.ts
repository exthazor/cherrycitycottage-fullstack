import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const checkAvailabilitySchema = z.object({
    startDate: z.string(),
    endDate: z.string(),
    roomTypeId: z.number(),
    numberOfRooms: z.number(),
  });
  
export const createReservationSchema = z.object({
    hotelId: z.number(),
    roomTypeId: z.number(),
    startDate: z.string(),
    endDate: z.string(),
    userId: z.string().optional(),
    guestEmail: z.string().optional(),
    guestPhone: z.string().optional(),
    numberOfRooms: z.number(),
  });

  
