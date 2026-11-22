import { describe, expect, it } from 'vitest';
import css from './app.css?raw';

// Layout can't be measured in tests, so this guards the rules in the stylesheet itself:
// text readable in a car (12 px and up) and form fields that don't make iOS zoom in (16 px).
const rules = [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)].map(([, selector, body]) => ({ selector: selector.trim(), body }));

describe('app.css', () => {
  it('has no text smaller than 12 px', () => {
    const small = rules.flatMap(({ selector, body }) =>
      [...body.matchAll(/font-size:\s*([\d.]+)px/g)].filter(([, px]) => Number(px) < 12).map(([, px]) => `${selector}: ${px}px`),
    );
    expect(small).toEqual([]);
  });

  it('form fields are at least 16 px', () => {
    const small = rules
      .filter(({ selector }) => /\b(input|select|textarea)\b/.test(selector))
      .flatMap(({ selector, body }) => [...body.matchAll(/font-size:\s*([\d.]+)px/g)].filter(([, px]) => Number(px) < 16).map(([, px]) => `${selector}: ${px}px`));
    expect(small).toEqual([]);
  });
});
