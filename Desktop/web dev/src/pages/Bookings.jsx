import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useBookings } from '../hooks/useBookings';
import { Calendar } from 'lucide-react';
import BookingCard from '../components/BookingCard';
import ReviewModal from '../components/ReviewModal';
import { addReview } from '../services/reviewService';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function Bookings() {
  const { user } = useAuth();
  const { bookings, loadUserBookings, isLoading, editBooking, cancelBooking, deleteBooking } = useBookings();
  const [reviewBooking, setReviewBooking] = useState(null);
      // Handler for deleting a booking
      const handleDelete = async (bookingId) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
          try {
            await deleteBooking(bookingId);
            toast.success('Booking deleted!');
          } catch {
            toast.error('Failed to delete booking.');
          }
        }
      };
    // Handler for editing a booking
    const handleEdit = async (bookingId, updates) => {
      try {
        await editBooking(bookingId, updates);
        toast.success('Booking updated!');
      } catch {
        toast.error('Failed to update booking.');
      }
    };

    // Handler for cancelling a booking
    const handleCancel = async (bookingId) => {
      try {
        await cancelBooking(bookingId);
        toast.success('Booking cancelled.');
      } catch {
        toast.error('Failed to cancel booking.');
      }
    };
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      loadUserBookings(user.id);
    }
  }, [user, loadUserBookings]);

  if (isLoading) return <Loader fullScreen />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Bookings</h2>
      
      {bookings.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl border border-gray-100 text-center shadow-sm">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="text-gray-400" size={24} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
          <p className="text-gray-500 mb-6">You haven't requested any services yet.</p>
          <button onClick={() => navigate('/')} className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Discover Services
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="relative">
              <BookingCard
                booking={booking}
                onAction={(id, action) => {
                  if (action === 'reschedule') {
                    const newDate = window.prompt('Enter new date & time (YYYY-MM-DDTHH:mm):', booking.date);
                    if (newDate) handleEdit(id, { date: newDate });
                  } else if (action === 'cancelled') {
                    handleCancel(id);
                  } else if (action === 'delete') {
                    handleDelete(id);
                  }
                }}
              />
              {/* Show Rate Provider button for completed bookings without review */}
              {booking.status === 'completed' && !booking.reviewed && (
                <button
                  className="absolute top-4 right-4 bg-amber-500 hover:bg-amber-600 text-white px-4 py-1.5 rounded font-semibold shadow text-sm"
                  onClick={() => setReviewBooking(booking)}
                >
                  Rate Provider
                </button>
              )}
            </div>
          ))}
              {reviewBooking && (
                <ReviewModal
                  onSubmit={async (review) => {
                    await addReview({
                      providerId: reviewBooking.provider_id,
                      userId: user.id,
                      bookingId: reviewBooking.id,
                      rating: review.rating,
                      comment: review.comment,
                      userName: user.name || user.displayName || user.email,
                    });
                    setReviewBooking(null);
                    toast.success('Thank you for your review!');
                    // Optionally reload bookings to update reviewed status
                    loadUserBookings(user.id);
                  }}
                  onClose={() => setReviewBooking(null)}
                />
              )}
        </div>
      )}
    </div>
  );
}

export default Bookings;
