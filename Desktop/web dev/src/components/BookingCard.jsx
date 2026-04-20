import React from 'react';
import { Calendar, MapPin, Clock, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatDate, formatTime } from '../utils/helpers';

const BookingCard = ({ booking, isProviderView = false, onAction }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover-lift hover:border-primary-200 hover:bg-primary-50/40">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-3 w-full justify-between">
          <div className="flex items-center gap-3">
            <h3 className="font-extrabold text-xl text-gray-900 tracking-tight">{booking.service_title || booking.service || 'Service'}</h3>
            <StatusBadge status={booking.status} />
          </div>
          {/* Provider view: Show delete button for cancelled bookings at far right, not as a badge */}
          {isProviderView && booking.status === 'cancelled' && onAction && (
            <button
              onClick={() => onAction(booking.id, 'delete')}
              className="ml-4 px-4 py-1.5 bg-white text-red-500 hover:bg-red-50 hover:text-red-700 rounded-lg text-xs font-semibold transition-all shadow border border-red-200 hover:border-red-400 flex items-center gap-1 cursor-pointer"
              title="Delete this cancelled booking"
            >
              <Trash2 size={15} className="inline-block" /> Delete
            </button>
          )}
        </div>
        <div className="text-sm text-gray-600 space-y-2">
          {isProviderView && (
            <p className="flex items-center font-medium text-gray-800 bg-gray-50 max-w-max px-3 py-1 rounded-md"><span className="text-gray-400 font-normal mr-2">Client:</span> {booking.customer_name}</p>
          )}
          <div className="flex flex-wrap gap-4 pt-1">
            <p className="flex items-center bg-gray-50 py-1.5 px-3 rounded-lg border border-gray-100">
              <Calendar size={15} className="mr-2 text-primary-500" /> <span className="font-medium mr-2">{formatDate(booking.date)}</span> 
              <Clock size={15} className="ml-2 mr-2 text-primary-500" />
              <span className="font-medium">
                {booking.timeSlot
                  ? (() => {
                      // Format timeSlot (e.g., 5:30) as AM/PM
                      const [h, m] = booking.timeSlot.split(':');
                      let hour = parseInt(h, 10);
                      const ampm = hour >= 12 ? 'PM' : 'AM';
                      if (hour === 0) hour = 12;
                      else if (hour > 12) hour -= 12;
                      return `${hour}:${m} ${ampm}`;
                    })()
                  : formatTime(booking.date)}
              </span>
            </p>
            <p className="flex items-center bg-gray-50 py-1.5 px-3 rounded-lg border border-gray-100">
              <MapPin size={15} className="mr-2 text-secondary-500"/> <span className="font-medium truncate max-w-[200px]">{booking.address}</span>
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-start md:items-end w-full md:w-auto mt-2 md:mt-0 pt-6 md:pt-0 border-t md:border-t-0 border-gray-100 gap-4">
        <div className="text-right">
            <span className="text-xs text-gray-400 uppercase font-bold tracking-wider block mb-0.5 md:hidden">Total Value</span>
            <div className="text-2xl font-black text-primary-900">₹{(typeof booking.total_cost === 'number' ? booking.total_cost : 0).toFixed(2)}</div>
        </div>

        {/* User actions: Cancel/Reschedule (not completed/cancelled) */}
        {!isProviderView && onAction && !['completed','cancelled','rejected'].includes(booking.status) && (
          <div className="flex flex-wrap gap-2 w-full md:justify-end">
            <button
              onClick={() => onAction(booking.id, 'reschedule')}
              className="px-5 py-2 bg-secondary-50 text-secondary-700 hover:bg-secondary-500 hover:text-white rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md border border-secondary-200 hover:border-transparent"
            >
              Reschedule
            </button>
            <button
              onClick={() => onAction(booking.id, 'cancelled')}
              className="px-5 py-2 bg-red-50 text-red-700 hover:bg-red-500 hover:text-white rounded-xl text-sm font-bold transition-all shadow-sm border border-red-200 hover:border-transparent"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Delete option for cancelled bookings */}
        {!isProviderView && onAction && booking.status === 'cancelled' && (
          <div className="flex flex-wrap gap-2 w-full md:justify-end">
            <button
              onClick={() => onAction(booking.id, 'delete')}
              className="px-5 py-2 bg-gray-100 text-gray-600 hover:bg-red-600 hover:text-white rounded-xl text-sm font-bold transition-all shadow-sm border border-gray-200 hover:border-transparent"
            >
              Delete
            </button>
          </div>
        )}

        {/* Provider actions (existing + delete for cancelled) */}
        {isProviderView && onAction && (
          <div className="flex flex-wrap gap-2 w-full md:justify-end">
            {booking.status === 'pending' && (
              <>
                <button 
                  onClick={() => onAction(booking.id, 'accepted')}
                  className="px-5 py-2 bg-secondary-50 text-secondary-700 hover:bg-secondary-500 hover:text-white rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md flex-1 md:flex-none border border-secondary-200 hover:border-transparent"
                >
                  Accept Job
                </button>
                <button 
                  onClick={() => onAction(booking.id, 'rejected')}
                  className="px-5 py-2 bg-red-50 text-red-700 hover:bg-red-500 hover:text-white rounded-xl text-sm font-bold transition-all shadow-sm flex-1 md:flex-none border border-red-200 hover:border-transparent"
                >
                  Decline
                </button>
              </>
            )}
            {booking.status === 'accepted' && (
              <button 
                onClick={() => onAction(booking.id, 'in_progress')}
                className="px-5 py-2.5 bg-primary-50 text-primary-700 hover:bg-primary-600 hover:text-white rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md border border-primary-200 hover:border-transparent w-full md:w-auto"
              >
                Mark In Progress
              </button>
            )}
            {booking.status === 'in_progress' && (
              <button 
                onClick={() => onAction(booking.id, 'completed')}
                className="px-6 py-2.5 bg-accent-500 text-white hover:bg-accent-600 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg w-full md:w-auto"
              >
                Complete Job
              </button>
            )}
            {/* Delete for cancelled bookings (provider view) - now moved to top right, so hidden here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
