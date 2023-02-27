import { calculateRatingAverage } from '@/utils'
import { Rating } from '@prisma/client'
import React from 'react'
import fullStar from '@/public/icons/full-star.png';
import halfStar from '@/public/icons/half-star.png';
import emptyStar from '@/public/icons/empty-star.png';
import Image from 'next/image';

export default function Stars({ ratings, rating }: { ratings?: Rating[]; rating?: Rating }) {
  let avgRating = 0;
  if (ratings) {
    avgRating = calculateRatingAverage(ratings) as number;
  }
  if (rating) {
    avgRating = rating.rating;
  }

  const renderStars = () => {
    const stars = [];
    for(let i = 0; i < 5; i++) {
      const difference = parseFloat((avgRating - i).toFixed(1));
      if (difference >= 1) stars.push(fullStar)
      else if (difference < 1 && difference > 0) {
        if (difference <= 0.2) stars.push(emptyStar);
        if (difference > 0.2 && difference <= 0.6) stars.push(halfStar);
        else stars.push(fullStar);
      }
      else stars.push(emptyStar);
    }

    return stars.map(star => <Image src={star} alt='Star' className='w-4 h-4 mr-1' width={4} height={4} />)
  };

  return (
    <div className='flex items-center'>{renderStars()}</div>
  )
}
