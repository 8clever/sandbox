import React from "react";
import { ResizeObserver } from "resize-observer";
import { ContentRect } from "resize-observer/lib/ContentRect";

export const useResizeObserver = () => {
  const [ rect, setRect ] = React.useState<ContentRect | null>(null);

  const refCallback = React.useCallback(($el: HTMLElement) => {
    if (!$el) return;

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      setRect(entry.contentRect);
    });

    ro.observe($el);
    setRect($el.getBoundingClientRect());
    
    return () => {
      ro.disconnect();
    }
  }, []);

  return [ 
    rect ? rect.width : 0,
    rect ? rect.height : 0,
    refCallback,
    rect
  ] as [ 
    number, 
    number,
    ($el: HTMLElement) => void,
    ContentRect
  ];
} 