import { times } from "@/data";
import { RestaurantSearchOptions, TRestaurantResponse, TRestaurantTable } from "@/types/restaurant";
import { Item, PrismaClient, Restaurant, Table } from "@prisma/client";
import { NextApiResponse } from "next";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

  export const fetchRestaurants = async (): Promise<TRestaurantResponse[]> => {
  const restaurants = await prisma.restaurant.findMany({
    include: {
      Cuisine: {
        select: {
          name: true,
        }
      },
      Location: {
        select: {
          name: true,
        }
      },
      Rating: true
    }
  });

  return restaurants;
};

export const fetchRestaurantBySlug = async (slug: string): Promise<TRestaurantResponse> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    },
    include: {
      Cuisine: {
        select: {
          name: true,
        }
      },
      Location: {
        select: {
          name: true,
        }
      },
      Rating: true
    }
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

export const fetchRestaurantBySlugWithTable = async (slug: string): Promise<TRestaurantTable | null> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      Table: true,
      open_time: true,
      close_time: true,
    },
  });

  return restaurant;
};

export const fetchRestaurantsBySearchOptions = async (options: RestaurantSearchOptions): Promise<TRestaurantResponse[]> => {
  const where: any = {};
  if (options.city) {
    where.Location = {
      name: {
        contains: options.city.toLowerCase()
      }
    };
  }
  if (options.cuisine) {
    where.Cuisine = {
      name: {
        contains: options.cuisine.toLowerCase()
      }
    };
  }
  if (options.price) {
    where.price = {
      equals: options.price
    };
  }

  const restaurants = await prisma.restaurant.findMany({
    where,
    include: {
      Location: true,
      Cuisine: true,
      Rating: true
    }
  });

  return restaurants;
};

export const fetchRestaurantItems = async(slug: string): Promise<Item[]> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    },
    include: {
      items: true
    }
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant?.items || [];
};

export const findAvailabileTables = async ({
  time,
  day,
  res,
  restaurant,
}: {
  time: string;
  day: string;
  res: NextApiResponse;
  restaurant: TRestaurantTable;
}) => {
  const searchTimes = times.find((t) => {
    return t.time === time;
  })?.searchTimes;

  if (!searchTimes) {
    return res.status(400).json({
      errorMessage: "Invalid data provided",
    });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });

  const bookingTablesObj: { [key: string]: { [key: number]: true } } = {};

  bookings.forEach((booking) => {
    bookingTablesObj[booking.booking_time.toISOString()] =
      booking.tables.reduce((obj, table) => {
        return {
          ...obj,
          [table.table_id]: true,
        };
      }, {});
  });

  const tables = restaurant.Table;

  const searchTimesWithTables = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables,
    };
  });

  searchTimesWithTables.forEach((t) => {
    t.tables = t?.tables?.filter((table) => {
      if (bookingTablesObj[t.date.toISOString()]) {
        if (bookingTablesObj[t.date.toISOString()][table.id]) return false;
      }
      return true;
    });
  });

  return searchTimesWithTables;
};