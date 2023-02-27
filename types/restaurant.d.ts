import { Cuisine, Location, Rating, Restaurant, Table } from "@prisma/client";

type TLocationName = {
  name: string;
};

type TCuisineName = {
  name: string;
};

export type TRestaurantResponse = Restaurant & {
  Location: Location | TLocationName | null;
  Cuisine: Cuisine | TCuisineName | null;
  Rating: Rating[] | null;
};

export type TRestaurantTable = {
  Table?: Table[] | null;
  open_time?: string | null;
  close_time?: string | null;
};

export type RestaurantSearchOptions = {
  city?: string | null; 
  cuisine?: string | null; 
  price?: PRICE | null;
};