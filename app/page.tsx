import { fetchRestaurants } from "@/services/restaurant";
import Link from "next/link";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";

export default async function Home() {
  const restaurants = await fetchRestaurants();

  return (
    <>
      <main>
        <Header />
        <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
          {restaurants.map(restaurant => <RestaurantCard restaurant={restaurant} />)}
        </div>
      </main>
    </>

  )
}
