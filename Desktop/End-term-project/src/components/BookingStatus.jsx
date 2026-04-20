import React from 'react';

const STATUS_STEPS = [
  { key: 'requested', label: 'Requested' },
  { key: 'accepted', label: 'Accepted' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' },
  { key: 'rejected', label: 'Rejected' },
];

const BookingStatus = ({ status }) => {
  return (
    <div className="flex gap-4 items-center mt-4">
      {STATUS_STEPS.filter(s => s.key !== 'rejected' || status === 'rejected').map((step, idx) => {
        const active = STATUS_STEPS.findIndex(s => s.key === status) >= idx;
        const rejected = status === 'rejected' && step.key === 'rejected';
        return (
          <div key={step.key} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${rejected ? 'bg-red-500' : active ? 'bg-emerald-500' : 'bg-gray-300'}`}>{idx + 1}</div>
            <span className={`text-sm ${rejected ? 'text-red-500' : active ? 'text-emerald-700' : 'text-gray-400'}`}>{step.label}</span>
            {idx < STATUS_STEPS.length - 2 && <div className="w-8 h-1 bg-gray-200 rounded" />}
          </div>
        );
      })}
    </div>
  );
};

export default BookingStatus;
