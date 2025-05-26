"use client"

import React from 'react';

export function NextVideo({src}: {src: string}) {
  return (
    <div className="w-full">
      <video
        src={src}
        muted={true}
        loop={true}
        autoPlay={true}
        className="w-full h-auto"
        controls={false}
      />
    </div>
  );
}