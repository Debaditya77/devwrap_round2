'use client';

import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';

interface SplineWrapperProps {
  splineUrl: string;
  className?: string;
}

export default function SplineWrapper({ splineUrl, className = "absolute inset-0 z-[-1] w-full h-full overflow-hidden pointer-events-none" }: SplineWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={className}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="w-full h-full pointer-events-auto">
        <Spline
          scene={splineUrl}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
}
