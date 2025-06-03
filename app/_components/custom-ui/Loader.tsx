import React from 'react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  fullscreen?: boolean;
  message?: string;
  type?: 'spinner' | 'dots' | 'bar' | 'custom';
  customIndicator?: React.ReactNode;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  fullscreen = false,
  message = 'Loading...',
  type = 'spinner',
  customIndicator,
  className = '',
}) => {
  if (!fullscreen) return null; // only render if fullscreen is true

  const renderIndicator = () => {
    switch (type) {
      case 'dots':
        return (
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
            <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-100" />
            <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200" />
          </div>
        );
      case 'bar':
        return (
          <div className="w-48 h-2 bg-gray-300 rounded overflow-hidden">
            <div className="h-full w-1/2 bg-blue-500 animate-pulse rounded" />
          </div>
        );
      case 'custom':
        return customIndicator;
      case 'spinner':
      default:
        return (
          <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-white" />
        );
    }
  };

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center space-y-4 bg-black bg-opacity-70 backdrop-blur-sm text-white',
        className,
      )}
    >
      {renderIndicator()}
      {message && <p className="text-lg">{message}</p>}
    </div>
  );
};

export default Loader;
