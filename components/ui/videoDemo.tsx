"use client"

import React, { useRef, useEffect, useState } from 'react';
import getStarted from '@/videos/get-started.mp4';
import Video from 'next-video';

export function VideoDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Update state to control video playback
          setShouldPlay(entry.isIntersecting);
        });
      },
      { threshold: 0.7 } // When 70% of the container is visible
    );

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <Video
        src={getStarted}
        controls={false}
        muted={true}
        loop={true}
        playsInline={true}
        autoPlay={shouldPlay}
        className="w-full h-auto"
      />
    </div>
  );
}