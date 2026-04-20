import React, { useState } from 'react';

const ReviewModal = ({ onSubmit, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) return;
    onSubmit({ rating, comment });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl">×</button>
        <h2 className="text-xl font-bold mb-4 text-center">Rate Your Provider</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center gap-2 mb-2">
            {[1,2,3,4,5].map(star => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={star <= rating ? 'text-amber-400 text-3xl' : 'text-gray-300 text-3xl'}
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
              >★</button>
            ))}
          </div>
          <textarea
            className="w-full border rounded px-3 py-2 min-h-[80px]"
            placeholder="Write a review (optional)"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold mt-2">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
