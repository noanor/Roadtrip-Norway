// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { config } from './config';
import { TripProvider } from './context/TripContext';
import { routes } from './routes';

// The browser router (as in production), opened on `path` as if the visitor came from a link.
function renderAt(path: string) {
  window.history.replaceState(null, '', path);
  const router = createBrowserRouter(routes);
  render(
    <TripProvider>
      <RouterProvider router={router} />
    </TripProvider>,
  );
  return router;
}

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  cleanup();
});

describe('every page renders', () => {
  const pages: [string, RegExp][] = [
    ['/', /Planlegg bilturen din i Norge/],
    ['/interesser', /Hva vil dere oppleve på turen\?/],
    ['/rute', /Oslo → Bergen/],
    ['/rute/kart', /Oslo → Bergen/],
    ['/stopp/mjosey', /Mjøsey Bakeri/],
    ['/stopp/hadeland', /Hadeland Glassverk/],
    ['/lagret', /Lagret/],
    ['/profil', /Profil/],
    ['/pris', /Gratis for reisende/],
    ['/innstillinger', /Maks kjøring per dag/],
    ['/for-aktorer', /Bli oppdaget av bilturister langs veien/],
    ['/varsler', /Varsler/],
  ];
  it.each(pages)('%s', (path, heading) => {
    renderAt(path);
    expect(screen.getAllByText(heading).length).toBeGreaterThan(0);
  });

  it('shows a message for a stop that does not exist', () => {
    renderAt('/stopp/finnes-ikke');
    expect(screen.getByText('Fant ikke stoppet')).toBeTruthy();
  });

  it('shows a message for an unknown address', () => {
    renderAt('/tull/og/tøys');
    expect(screen.getByText('Siden finnes ikke')).toBeTruthy();
  });
});

describe('data saved in the browser', () => {
  it('survives invalid JSON', () => {
    localStorage.setItem(config.storageKey, '{{ not json');
    renderAt('/rute');
    expect(screen.getByText('Dag 1')).toBeTruthy();
  });

  it('survives out-of-range days and stops that no longer exist', () => {
    localStorage.setItem(
      config.storageKey,
      JSON.stringify({ days: 99, activeDay: 42, added: { 1: ['ghost'] }, saved: ['ghost'], interests: 'mat' }),
    );
    renderAt('/rute');
    expect(screen.getAllByRole('tab').map((t) => t.textContent)).toEqual(['Dag 1', 'Dag 2', 'Dag 3', 'Dag 4', 'Dag 5']);
    expect(screen.getByRole('tab', { selected: true }).textContent).toBe('Dag 5');
  });

  it('shows the empty state when saved stops no longer exist', () => {
    localStorage.setItem(config.storageKey, JSON.stringify({ saved: ['ghost'] }));
    renderAt('/lagret');
    expect(screen.getByText(/Trykk på bokmerket/)).toBeTruthy();
  });
});

describe('flows', () => {
  it('adding a suggested stop from its page puts it on the route (Figma flow 1)', async () => {
    const router = renderAt('/stopp/mjosey');
    fireEvent.click(screen.getByRole('button', { name: /Legg til rute/ }));
    expect(router.state.location.pathname).toBe('/rute');
    expect(await screen.findByText('Lagt til av deg')).toBeTruthy();
    expect(screen.queryByText('Forslag langs veien')).toBeNull();
  });

  it('a stop can be removed from the route in edit mode', () => {
    renderAt('/rute');
    expect(screen.queryByRole('button', { name: /Fjern Heddal stavkirke/ })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Endre stopp' }));
    fireEvent.click(screen.getByRole('button', { name: /Fjern Heddal stavkirke/ }));
    expect(screen.getByText('Heddal stavkirke er fjernet fra dag 1')).toBeTruthy();
    // it is offered again as a suggestion
    expect(screen.getByRole('button', { name: 'Legg Heddal stavkirke til i ruten' })).toBeTruthy();
  });

  it('a paid placement is marked as an ad in the list and on its page', () => {
    renderAt('/rute');
    expect(screen.getByText('Annonse')).toBeTruthy();
    expect(screen.queryByText('Anbefalt stopp')).toBeNull();
    cleanup();
    renderAt('/stopp/mjosey');
    expect(screen.getByText('Annonse')).toBeTruthy();
    expect(screen.getByText(/Stedet betaler for å bli fremhevet/)).toBeTruthy();
  });

  it('each stop shows its own reviews', async () => {
    renderAt('/stopp/mjosey');
    expect(await screen.findByText(/viser 2 av 126/)).toBeTruthy();
    const bakery = Array.from(document.querySelectorAll('.review p')).map((p) => p.textContent);
    expect(bakery).toHaveLength(2);
    cleanup();
    renderAt('/stopp/rauland');
    expect(await screen.findByText(/viser 2 av 54/)).toBeTruthy();
    const farm = Array.from(document.querySelectorAll('.review p')).map((p) => p.textContent);
    expect(farm).toHaveLength(2);
    expect(farm.some((text) => bakery.includes(text))).toBe(false);
  });

  it('a three-day trip ends in Bergen and warns about a long day', () => {
    localStorage.setItem(config.storageKey, JSON.stringify({ days: 3, activeDay: 2 }));
    renderAt('/rute');
    expect(screen.getByText(/Gvarv → Odda/)).toBeTruthy();
    expect(screen.getByText(/Lang kjøredag/)).toBeTruthy();
    fireEvent.click(screen.getByRole('tab', { name: 'Dag 3' }));
    expect(screen.getByText(/Odda → Bergen/)).toBeTruthy();
  });

  it('nothing is saved or chosen before the traveller does it', () => {
    renderAt('/lagret');
    expect(screen.getByText(/Trykk på bokmerket/)).toBeTruthy();
    cleanup();
    renderAt('/interesser');
    expect(screen.getByRole('button', { name: /0 valgt/ })).toBeTruthy();
  });

  it('the back button on a page opened from a link stays inside the app', () => {
    const router = renderAt('/stopp/mjosey');
    fireEvent.click(screen.getAllByRole('button', { name: 'Tilbake' })[0]);
    expect(router.state.location.pathname).toBe('/rute');
  });

  it('cannot continue from interests with nothing selected', () => {
    localStorage.setItem(config.storageKey, JSON.stringify({ interests: [] }));
    renderAt('/interesser');
    const cta = screen.getByRole('button', { name: /Vis forslag til rute/ }) as HTMLButtonElement;
    expect(cta.disabled).toBe(true);
  });

  it('does not search with an empty destination', () => {
    const router = renderAt('/');
    fireEvent.change(screen.getByLabelText('Til'), { target: { value: '   ' } });
    fireEvent.click(screen.getByRole('button', { name: /Neste: velg interesser/ }));
    expect(router.state.location.pathname).toBe('/');
    expect(screen.getByText('Fyll inn både fra og til')).toBeTruthy();
  });

  it('day stepper stops at 1 and 5', () => {
    renderAt('/');
    const less = screen.getByRole('button', { name: 'Færre dager' });
    const more = screen.getByRole('button', { name: 'Flere dager' });
    for (let i = 0; i < 10; i++) fireEvent.click(less);
    expect(screen.getByText('1', { selector: 'output' })).toBeTruthy();
    for (let i = 0; i < 10; i++) fireEvent.click(more);
    expect(screen.getByText('5', { selector: 'output' })).toBeTruthy();
  });

  it('registering a business shows the confirmation', async () => {
    vi.useFakeTimers();
    renderAt('/for-aktorer');
    fireEvent.change(screen.getByPlaceholderText('F.eks. Mjøsey Bakeri'), { target: { value: 'Test & Co <b>' } });
    fireEvent.change(screen.getByPlaceholderText('F.eks. Kongsberg'), { target: { value: 'Gol' } });
    fireEvent.click(screen.getByRole('button', { name: /Registrer bedriften din/ }));
    expect(screen.getByRole('button', { name: /Sender/ })).toBeTruthy();
    await act(async () => {
      await vi.runAllTimersAsync();
    });
    vi.useRealTimers();
    expect(screen.getByText('Takk, vi har mottatt registreringen')).toBeTruthy();
  });
});

describe('phase 1 features', () => {
  it('does not search with a place it does not know', () => {
    const router = renderAt('/');
    fireEvent.change(screen.getByLabelText('Til'), { target: { value: 'Atlantis' } });
    fireEvent.click(screen.getByRole('button', { name: /Neste: velg interesser/ }));
    expect(router.state.location.pathname).toBe('/');
    expect(screen.getByText(/Vi kjenner ikke igjen «Atlantis»/)).toBeTruthy();
  });

  it('shows via places and the vehicle on the route', () => {
    localStorage.setItem(config.storageKey, JSON.stringify({ via: ['Kongsberg', ''], vehicle: 'Bobil' }));
    renderAt('/rute');
    expect(screen.getByText(/via Kongsberg/)).toBeTruthy();
    expect(screen.getByText(/· Bobil/)).toBeTruthy();
  });

  it('offers to add a day to a long day when the plan is flexible', () => {
    localStorage.setItem(config.storageKey, JSON.stringify({ days: 3, activeDay: 2, flexible: true }));
    renderAt('/rute');
    fireEvent.click(screen.getByRole('button', { name: 'Legg til en dag' }));
    expect(screen.getAllByRole('tab')).toHaveLength(4);
  });

  it('does not offer an extra day when the number of days is locked', () => {
    localStorage.setItem(config.storageKey, JSON.stringify({ days: 3, activeDay: 2, flexible: false }));
    renderAt('/rute');
    expect(screen.getByText(/Lang kjøredag/)).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Legg til en dag' })).toBeNull();
  });

  it('a stop that does not suit the vehicle cannot be added', () => {
    localStorage.setItem(config.storageKey, JSON.stringify({ vehicle: 'Bobil' }));
    renderAt('/stopp/floyen');
    const cta = screen.getByRole('button', { name: /Passer ikke for bobil/ }) as HTMLButtonElement;
    expect(cta.disabled).toBe(true);
  });

  it("the owner's answer arrives as a notification", async () => {
    vi.useFakeTimers();
    renderAt('/stopp/mjosey');
    fireEvent.click(screen.getByRole('button', { name: 'Spørsmål til eieren?' }));
    fireEvent.change(screen.getByPlaceholderText(/glutenfritt/), { target: { value: 'Har dere glutenfritt brød?' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send spørsmål' }));
    await act(async () => {
      await vi.runAllTimersAsync();
    });
    vi.useRealTimers();
    expect(screen.getByText('Du spurte: Har dere glutenfritt brød?')).toBeTruthy();
    cleanup();
    renderAt('/');
    expect(screen.getByRole('button', { name: 'Varsler, 1 nye' })).toBeTruthy();
    cleanup();
    renderAt('/varsler');
    expect(screen.getByText('Mjøsey Bakeri har svart')).toBeTruthy();
  });

  it('signing in shows the name, signing out goes back to guest', () => {
    renderAt('/profil');
    fireEvent.click(screen.getByRole('button', { name: 'Logg inn' }));
    fireEvent.change(screen.getByLabelText('Navn'), { target: { value: 'Kari Nordmann' } });
    fireEvent.change(screen.getByLabelText('E-post'), { target: { value: 'kari@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Logg inn' }));
    expect(screen.getByText('Kari Nordmann')).toBeTruthy();
    expect(screen.getByText('KN')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Logg ut' }));
    expect(screen.getByText('Gjest')).toBeTruthy();
  });
});

describe('home page', () => {
  it('keeps vehicle and day plan under «Flere valg», with their values in the summary', () => {
    renderAt('/');
    expect(screen.queryByRole('button', { name: 'Bobil' })).toBeNull();
    expect(screen.getByText('Bil · kan legge til en dag')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /Flere valg/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Bobil' }));
    expect(screen.getByText('Bobil · kan legge til en dag')).toBeTruthy();
  });

  it('a popular tour fills in the route and its days and goes to step 2', () => {
    const router = renderAt('/');
    fireEvent.click(screen.getByRole('button', { name: /Hardanger i frukttiden/ }));
    expect(router.state.location.pathname).toBe('/interesser');
    expect(screen.getByText(/Bergen → Odda/)).toBeTruthy();
    cleanup();
    renderAt('/');
    expect(screen.getByText('3', { selector: 'output' })).toBeTruthy();
  });
});
