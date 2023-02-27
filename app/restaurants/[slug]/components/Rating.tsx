import Stars from "@/app/components/Stars";
import { calculateRatingAverage } from "@/utils";
import { Rating as RatingModel } from "@prisma/client";

export default function Rating({ ratings }: { ratings: RatingModel[] }) {
  const reviewCount = ratings.length;
  const avgRating = calculateRatingAverage(ratings).toFixed(1);

  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars ratings={ratings} />
        <p className="text-reg ml-3">{avgRating}</p>
      </div>
      <div>
        <p className="text-reg ml-4">{reviewCount} Review{reviewCount > 1 ? 's' : ''}</p>
      </div>
    </div>
  );
}