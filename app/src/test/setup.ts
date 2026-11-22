// Test environment fixes for DOM tests (files marked `// @vitest-environment jsdom`).
if (typeof window !== 'undefined') {
  // Node 22+ has its own localStorage global (disabled unless started with --localstorage-file),
  // which hides jsdom's. Use a plain in-memory Storage instead.
  const store = new Map<string, string>();
  const storage: Storage = {
    get length() {
      return store.size;
    },
    clear: () => store.clear(),
    getItem: (key) => store.get(key) ?? null,
    key: (index) => [...store.keys()][index] ?? null,
    removeItem: (key) => {
      store.delete(key);
    },
    setItem: (key, value) => {
      store.set(key, String(value));
    },
  };
  Object.defineProperty(globalThis, 'localStorage', { value: storage, configurable: true });

  // Leaflet only draws lines when it detects SVG support, which it checks with createSVGRect.
  // jsdom has SVG elements but not this method. Must run before leaflet is imported.
  const svgProto = window.SVGSVGElement?.prototype as unknown as Record<string, unknown> | undefined;
  if (svgProto && !('createSVGRect' in svgProto)) svgProto.createSVGRect = () => ({});

  // react-router builds a Request with jsdom's AbortSignal on every navigation, which Node's
  // Request rejects ("Expected signal to be an instance of AbortSignal"). Drop the signal in tests.
  const NodeRequest = globalThis.Request;
  globalThis.Request = class extends NodeRequest {
    constructor(input: RequestInfo | URL, init?: RequestInit) {
      super(input, init && { ...init, signal: undefined });
    }
  };

  // Tests never reach the network; the routing service then falls back to straight lines.
  globalThis.fetch = () => Promise.reject(new TypeError('Network disabled in tests'));
}
