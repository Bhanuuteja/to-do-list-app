
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-sky-500"></div>
      <p className="ml-3 text-sky-400">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
