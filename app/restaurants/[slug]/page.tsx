import { fetchRestaurantBySlug } from "@/services/restaurant";
import Description from "./components/Description";
import Images from "./components/Images";
import Rating from "./components/Rating";
import ReservationCard from "./components/ReservationCard";
import RestaurantNavbar from "./components/RestaurantNavbar";
import Reviews from "./components/Reviews";
import Title from "./components/Title";

type Props = {
  params: { 
    slug: string; 
  }
};

export default async function RestaurantDetails({ params }: Props) {
  const restaurant = await fetchRestaurantBySlug(params.slug);

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavbar slug={restaurant?.slug || ''} />
        <Title title={restaurant?.name || ''} />
        <Rating ratings={restaurant?.Rating} />
        <Description description={restaurant?.description || ''} />
        <Images images={restaurant?.images || []} />
        <Reviews reviews={restaurant?.Rating || []} />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard openTime={restaurant.open_time} closeTime={restaurant.close_time} slug={params.slug} />
      </div>
    </>  
  );
}