// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useDragScroll } from './useDragScroll';

function Row({ onPick }: { onPick: () => void }) {
  useDragScroll();
  return (
    <div className="hscroll" data-testid="row">
      <button onClick={onPick}>Kort</button>
    </div>
  );
}

/** jsdom has no layout: give the row a width wider than its box so it can scroll. */
function renderRow() {
  const onPick = vi.fn();
  render(<Row onPick={onPick} />);
  const row = screen.getByTestId('row');
  Object.defineProperty(row, 'scrollWidth', { value: 600 });
  Object.defineProperty(row, 'clientWidth', { value: 300 });
  row.scrollLeft = 100;
  return { row, card: screen.getByRole('button', { name: 'Kort' }), onPick };
}

afterEach(cleanup);

describe('useDragScroll', () => {
  it('dragging with the mouse scrolls the row the other way', () => {
    const { row, card } = renderRow();
    fireEvent.mouseDown(card, { button: 0, clientX: 200 });
    fireEvent.mouseMove(window, { clientX: 140 });
    expect(row.scrollLeft).toBe(160);
    expect(row.classList.contains('dragging')).toBe(true);
    fireEvent.mouseUp(window);
    expect(row.classList.contains('dragging')).toBe(false);
  });

  it('the click at the end of a drag does not press what is under the mouse', () => {
    const { card, onPick } = renderRow();
    fireEvent.mouseDown(card, { button: 0, clientX: 200 });
    fireEvent.mouseMove(window, { clientX: 150 });
    fireEvent.mouseUp(window);
    fireEvent.click(card);
    expect(onPick).not.toHaveBeenCalled();
  });

  it('a plain click still works', () => {
    const { row, card, onPick } = renderRow();
    fireEvent.mouseDown(card, { button: 0, clientX: 200 });
    fireEvent.mouseMove(window, { clientX: 198 });
    fireEvent.mouseUp(window);
    fireEvent.click(card);
    expect(onPick).toHaveBeenCalledTimes(1);
    expect(row.scrollLeft).toBe(100);
  });
});
