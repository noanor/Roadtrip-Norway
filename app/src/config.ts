// Runtime configuration. Override with VITE_* variables in .env (see .env.example).
export const config = {
  tileUrl: import.meta.env.VITE_TILE_URL ?? 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  tileAttribution:
    import.meta.env.VITE_TILE_ATTRIBUTION ??
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  routingUrl: import.meta.env.VITE_ROUTING_URL ?? 'https://router.project-osrm.org',
  storageKey: 'roadtrip-norway:trip:v1',
};
