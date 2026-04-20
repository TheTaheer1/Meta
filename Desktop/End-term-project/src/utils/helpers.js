// utils/helpers.js

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'accepted':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'in_progress':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'completed':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const formatStatusText = (status) => {
  if (!status) return '';
  return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};
