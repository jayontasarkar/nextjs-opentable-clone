import { calculateRatingAverage } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import Price from "./Price";
import Stars from "./Stars";

type Props = {
  restaurant: any;
}

export default function RestaurantCard({ restaurant }: Props) {
  const reviewCount = restaurant?.Rating?.length;
  const avgRating = calculateRatingAverage(restaurant?.Rating || []);

  return (
    <div
      className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer"
    >
      <Link href={`/restaurants/${restaurant.slug}`}>
        <Image
          src={restaurant.main_image}
          alt={restaurant.name}
          className="w-full h-36"
          width={254}
          height={144}
        />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{restaurant.name}</h3>
          <div className="flex items-start">
            <div className="flex mb-2">
              <Stars ratings={restaurant?.Rating} />
            </div>
            <p className="ml-2">{reviewCount} review{reviewCount > 1 ? 's' : ''}</p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{restaurant?.Cuisine?.name}</p>
            <p className="mr-3">
              <Price price={restaurant.price} />
            </p>
            <p>{restaurant?.Location?.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </Link>  
    </div>
  );
}