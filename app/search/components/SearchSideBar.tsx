import { RestaurantSearchOptions } from "@/types/restaurant";
import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";

export default function SearchSideBar({ locations, cuisines, searchParams }: { locations: Location[]; cuisines: Cuisine[]; searchParams: RestaurantSearchOptions }) {
  return (
    <div className="w-1/5 mr-3">
      <div className="border-b pb-4">
        <h1 className="mb-2">Region</h1>
        {
          locations.length ? 
            locations.map((location: Location) => 
              <p 
                key={location.id} 
                className="font-light text-reg capitalize" 
              >
                <Link href={{ pathname: '/search', query: { ...searchParams, city: location.name } }}>{location.name}</Link>
                
              </p>) : 
            <p className="font-light text-reg">No location found</p>
        }
      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2">Cuisine</h1>
        {
          cuisines.length ? 
            cuisines.map((cuisine: Cuisine) => <p key={cuisine.id} className="font-light text-reg capitalize"><Link href={{ pathname: '/search', query: { ...searchParams, cuisine: cuisine.name } }}>{cuisine.name}</Link></p>) : 
            <p className="font-light text-reg">No cuisine found</p>
        }
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <Link href={{ pathname: '/search', query: { ...searchParams, price: PRICE.CHEAP } }} className="border w-full text-reg font-light rounded-l p-2">
            $
          </Link>
          <Link
            href={{ pathname: '/search', query: { ...searchParams, price: PRICE.REGULAR } }}
            className="border-r border-t border-b w-full text-reg font-light p-2"
          >
            $$
          </Link>
          <Link
            href={{ pathname: '/search', query: { ...searchParams, price: PRICE.EXPENSIVE } }}
            className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r"
          >
            $$$
          </Link>
        </div>
      </div>
    </div>
  );
}