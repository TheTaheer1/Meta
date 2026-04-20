import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-10">
      <Loader2 className="animate-spin text-primary-600 mb-4" size={40} />
      <p className="text-gray-500 font-medium">Loading...</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex-1 flex w-full min-h-screen items-center justify-center bg-gray-50">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
