'use client';

import * as React from 'react';
import { cn } from '../../lib/utils'; // Adjust the relative path to match your project structure

const ScrollArea = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    orientation?: 'vertical' | 'horizontal' | 'both';
    scrollHideDelay?: number;
  }
>(({ className, children, orientation = 'vertical', scrollHideDelay = 600, ...props }, ref) => {
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [showScrollbar, setShowScrollbar] = React.useState(false);
  const scrollTimeout = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const handleScroll = () => {
    setIsScrolling(true);
    setShowScrollbar(true);
    
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
      setShowScrollbar(false);
    }, scrollHideDelay);
  };

  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden',
        className
      )}
      {...props}
    >
      <div
        ref={viewportRef}
        className={cn(
          'h-full w-full rounded-[inherit]',
          orientation === 'vertical' && 'overflow-y-auto',
          orientation === 'horizontal' && 'overflow-x-auto',
          orientation === 'both' && 'overflow-auto'
        )}
        onScroll={handleScroll}
      >
        {children}
      </div>

      {/* Vertical Scrollbar */}
      {(orientation === 'vertical' || orientation === 'both') && (
        <div
          className={cn(
            'absolute top-0 right-0 w-2.5 h-full touch-none select-none',
            'transition-opacity duration-300',
            showScrollbar ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div
            className={cn(
              'w-full bg-gray-700/50 rounded-full',
              isScrolling && 'bg-gray-600/70'
            )}
            style={{
              height: `${Math.min(
                100,
                (viewportRef.current?.offsetHeight?? / viewportRef.current?.scrollHeight) * 100
              )}%`,
              transform: `translateY(${
                (viewportRef.current?.scrollTop! / viewportRef.current?.scrollHeight!) * 100
              }%)`,
            }}
          />
        </div>
      )}

      {/* Horizontal Scrollbar */}
      {(orientation === 'horizontal' || orientation === 'both') && (
        <div
          className={cn(
            'absolute bottom-0 left-0 h-2.5 w-full touch-none select-none',
            'transition-opacity duration-300',
            showScrollbar ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div
            className={cn(
              'h-full bg-gray-700/50 rounded-full',
              isScrolling && 'bg-gray-600/70'
            )}
            style={{
              width: `${Math.min(
                100,
                (viewportRef.current?.offsetWidth! / viewportRef.current?.scrollWidth!) * 100
              )}%`,
              transform: `translateX(${
                (viewportRef.current?.scrollLeft! / viewportRef.current?.scrollWidth!) * 100
              }%)`,
            }}
          />
        </div>
      )}
    </div>
  );
});

ScrollArea.displayName = 'ScrollArea';

export { ScrollArea };