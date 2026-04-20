import React from 'react';
import { Star } from 'lucide-react';
import { formatDate } from '../utils/helpers';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-gray-900">{review.user_name || 'Anonymous User'}</h4>
        <span className="text-xs text-gray-500">{formatDate(review.created_at)}</span>
      </div>
      <div className="flex mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star}
            size={14} 
            className={`${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} 
          />
        ))}
      </div>
      <p className="text-sm text-gray-600">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
