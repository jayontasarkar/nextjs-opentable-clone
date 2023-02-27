import { Location, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchLocations = async(): Promise<Location[]> => {
  return await prisma.location.findMany({
    orderBy: [
      {
        name: 'asc'
      }
    ]
  });
};