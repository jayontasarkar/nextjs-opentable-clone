import { Cuisine, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchCuisines = async(): Promise<Cuisine[]> => {
  return await prisma.cuisine.findMany({
    orderBy: [
      {
        name: 'asc'
      }
    ]
  });
};