import { useEffect } from 'react';

/** Rows that scroll sideways: the day-trip cards, the day tabs and the chips on the full map. */
export const DRAG_SCROLL_SELECTOR = '.hscroll, .days, .map-chips';
/** Moves shorter than this are a click, not a drag. */
const DRAG_THRESHOLD_PX = 5;

/**
 * Lets the mouse drag sideways rows back and forth, as a finger does on a phone. Touch keeps the
 * browser's own scrolling: these are plain mouse events, which a finger swipe doesn't send.
 * One listener on the document covers every row, also ones that appear later.
 */
export function useDragScroll(selector = DRAG_SCROLL_SELECTOR) {
  useEffect(() => {
    let drag: { el: HTMLElement; startX: number; startLeft: number; moved: boolean } | null = null;

    const onDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      const el = (e.target as Element | null)?.closest<HTMLElement>(selector);
      if (!el || el.scrollWidth <= el.clientWidth) return;
      drag = { el, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
    };

    const onMove = (e: MouseEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.startX;
      if (!drag.moved && Math.abs(dx) < DRAG_THRESHOLD_PX) return;
      if (!drag.moved) {
        drag.moved = true;
        drag.el.classList.add('dragging');
      }
      e.preventDefault(); // no text selection while dragging
      drag.el.scrollLeft = drag.startLeft - dx;
    };

    const onUp = () => {
      if (!drag) return;
      if (drag.moved) {
        drag.el.classList.remove('dragging');
        // the click that ends a drag must not press the chip or card under the mouse
        const swallow = (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
        };
        window.addEventListener('click', swallow, { capture: true, once: true });
        setTimeout(() => window.removeEventListener('click', swallow, { capture: true }), 0);
      }
      drag = null;
    };

    document.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [selector]);
}
