import { fetchCuisines } from "@/services/cuisine";
import { fetchLocations } from "@/services/location";
import { fetchRestaurantsBySearchOptions } from "@/services/restaurant";
import { RestaurantSearchOptions, TRestaurantResponse } from "@/types/restaurant";
import { Cuisine, Location, PRICE } from "@prisma/client";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";


export default async function Search(
  { 
    searchParams 
  }: { 
    searchParams: RestaurantSearchOptions
  }
) {
  const restaurants: TRestaurantResponse[] = await fetchRestaurantsBySearchOptions({ ...searchParams });
  const locations: Location[] = await fetchLocations();
  const cuisines: Cuisine[] = await fetchCuisines();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar locations={locations} cuisines={cuisines} searchParams={searchParams} />
        <div className="w-5/6">
          {restaurants.length ? 
            restaurants.map(
              (restaurant: TRestaurantResponse) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ) : (
              <h4>No restaurant found with city ${searchParams?.city}</h4>
            )
          }
        </div>
      </div>
    </>
  );
}