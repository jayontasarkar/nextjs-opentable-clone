import Price from "@/app/components/Price";
import Stars from "@/app/components/Stars";
import { TRestaurantResponse } from "@/types/restaurant";
import { calculateRatingAverage } from "@/utils";
import Image from "next/image";
import Link from "next/link";

export default function RestaurantCard({ restaurant }: { restaurant: TRestaurantResponse }) {
  const renderRatingText = () => {
    const avgRating = calculateRatingAverage(restaurant?.Rating || []);
    if (avgRating > 4) return 'Awesome';
    if (avgRating > 3 && avgRating <= 4) return 'Good';
    if (avgRating <= 3 && avgRating > 0) return 'Average';

    return "";
  };

  return (
    <div className="border-b flex pb-5">
      <Image
        src={restaurant.main_image}
        alt={restaurant.name}
        className="w-44 rounded"
        width={164}
        height={164}
      />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">
            <Stars ratings={restaurant?.Rating || []} />
          </div>
          <p className="ml-2 text-sm">{renderRatingText()}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <p className="mr-4">
              <Price price={restaurant?.price} />
            </p>
            <p className="mr-4 capitalize">{restaurant?.Cuisine?.name}</p>
            <p className="mr-4 capitalize">{restaurant?.Location?.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurants/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
}