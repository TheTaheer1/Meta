import React from 'react';

// Example slots: 9:00, 10:00, ..., 18:00
const TIME_SLOTS = Array.from({ length: 10 }, (_, i) => `${9 + i}:00`);

function formatAMPM(slot) {
  const [hourStr, minStr] = slot.split(':');
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  if (hour === 0) hour = 12;
  else if (hour > 12) hour -= 12;
  return `${hour}:${minStr} ${ampm}`;
}

const TimeSlotPicker = ({ date, bookedSlots, value, onChange }) => {
  const now = new Date();
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="flex flex-wrap gap-2">
      {TIME_SLOTS.map(slot => {
        // Disable if slot is booked or in the past (for today)
        let disabled = bookedSlots.includes(slot);
        if (date === todayStr) {
          const slotDate = new Date(date + 'T' + slot.padStart(5, '0'));
          if (slotDate < now) disabled = true;
        }
        return (
          <button
            key={slot}
            type="button"
            className={`px-3 py-1 rounded border ${value === slot ? 'bg-emerald-500 text-white' : 'bg-white'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-50'}`}
            onClick={() => !disabled && onChange(slot)}
            disabled={disabled}
          >
            {formatAMPM(slot)}
          </button>
        );
      })}
    </div>
  );
};

export default TimeSlotPicker;
