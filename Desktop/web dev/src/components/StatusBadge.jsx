import React from 'react';
import { getStatusColor, formatStatusText } from '../utils/helpers';

const StatusBadge = ({ status }) => {
  return (
    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(status)}`}>
      {formatStatusText(status)}
    </span>
  );
};

export default StatusBadge;
