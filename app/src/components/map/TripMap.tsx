import L from 'leaflet';
import { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import { config } from '../../config';
import { STOPS } from '../../data/stops';
import type { TripPoint } from '../../domain/trip';
import type { DrivingRoute } from '../../services/routing';
import type { LatLng } from '../../types';
import { Icon } from '../Icon';
import { labelPin, pinIcon } from './markers';

interface Props {
  mode: 'route' | 'full';
  points: TripPoint[];
  startLabel: string;
  endLabel: string;
  /** Day to highlight, or null for the whole trip. */
  day: number | null;
  /** [start, end] waypoint indices of the highlighted day. */
  range: [number, number];
  suggestions: string[];
  route: DrivingRoute | null;
  userPosition?: LatLng | null;
  onOpenStop: (stopId: string) => void;
  onAddStop: (stopId: string) => void;
}

const ROUTE_STYLE = { color: '#c4683b', weight: 3, opacity: 0.9, dashArray: '4 8' };
const ROUTE_STYLE_REAL = { color: '#c4683b', weight: 4, opacity: 0.75 };
const DAY_STYLE = { color: '#1f3d2d', weight: 5, opacity: 0.9 };

export function TripMap(props: Props) {
  const { mode, points, day, range, route } = props;
  const [tilesFailed, setTilesFailed] = useState(false);
  const straight = useMemo(() => points.map((p) => p.location), [points]);

  const geometry = route?.geometry ?? straight;
  const index = route?.waypointIndex ?? straight.map((_, i) => i);
  const dayLine = day === null ? [] : geometry.slice(index[range[0]], index[range[1]] + 1);
  const [rangeStart, rangeEnd] = range;
  const bounds = useMemo(
    () => L.latLngBounds(day === null ? straight : straight.slice(rangeStart, rangeEnd + 1)),
    [straight, day, rangeStart, rangeEnd],
  );

  let stopNumber = 0;
  return (
    <>
      <MapContainer
        className="lmap"
        bounds={bounds}
        boundsOptions={{ padding: mode === 'full' ? [70, 70] : [28, 28] }}
        zoomControl={false}
        scrollWheelZoom={mode === 'full'}
      >
        <TileLayer
          url={config.tileUrl}
          attribution={config.tileAttribution}
          maxZoom={18}
          eventHandlers={{ tileload: () => setTilesFailed(false), tileerror: () => setTilesFailed(true) }}
        />
        <ZoomControl position={mode === 'full' ? 'bottomright' : 'topleft'} />
        <FitBounds bounds={bounds} padding={mode === 'full' ? 70 : 28} />
        <Polyline positions={geometry} pathOptions={route ? ROUTE_STYLE_REAL : ROUTE_STYLE} />
        {dayLine.length > 1 && <Polyline positions={dayLine} pathOptions={DAY_STYLE} />}

        {points.map((p, i) => {
          if (p.kind !== 'stop') {
            return (
              <Marker
                key={`end-${i}`}
                position={p.location}
                icon={labelPin(p.kind === 'start' ? props.startLabel : props.endLabel)}
                interactive={false}
                zIndexOffset={500}
              />
            );
          }
          stopNumber++;
          const stop = STOPS[p.stopId!];
          const current = day === null || p.day === day;
          const label = day === null ? stopNumber : (p.index ?? 0) + 1;
          return (
            <Marker
              key={p.stopId}
              position={p.location}
              icon={pinIcon(current ? 'cur' : 'dim', current ? String(label) : '')}
              title={stop.name}
              zIndexOffset={current ? 400 : 0}
            >
              <StopPopup stopId={stop.id} onOpen={props.onOpenStop} />
            </Marker>
          );
        })}

        {props.suggestions.map((id) => (
          <Marker key={`sugg-${id}`} position={STOPS[id].location} icon={pinIcon('sugg', '+')} title={STOPS[id].name}>
            <StopPopup stopId={id} onOpen={props.onOpenStop} onAdd={props.onAddStop} />
          </Marker>
        ))}

        {props.userPosition && <UserPosition position={props.userPosition} />}
      </MapContainer>
      {tilesFailed && <div className="tile-note">Kartbildene kunne ikke lastes. Sjekk nettforbindelsen.</div>}
    </>
  );
}

function StopPopup({ stopId, onOpen, onAdd }: { stopId: string; onOpen: (id: string) => void; onAdd?: (id: string) => void }) {
  const stop = STOPS[stopId];
  return (
    <Popup closeButton={false}>
      <div className="pop">
        <b>{stop.name}</b>
        <small>
          {stop.type} · {stop.place}
        </small>
        <div className="pop-actions">
          <button className="pop-btn" onClick={() => onOpen(stopId)}>
            Se stoppet
          </button>
          {onAdd && (
            <button className="pop-btn y" onClick={() => onAdd(stopId)}>
              <Icon name="plus" /> Legg til
            </button>
          )}
        </div>
      </div>
    </Popup>
  );
}

/** MapContainer only reads `bounds` on mount; refit when the highlighted day changes. */
function FitBounds({ bounds, padding }: { bounds: L.LatLngBounds; padding: number }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds, { padding: [padding, padding] });
  }, [map, bounds, padding]);
  useEffect(() => {
    // the container may have been sized by a page transition after mount
    const t = setTimeout(() => map.invalidateSize(), 320);
    return () => clearTimeout(t);
  }, [map]);
  return null;
}

function UserPosition({ position }: { position: LatLng }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 11);
  }, [map, position]);
  return <Marker position={position} icon={pinIcon('me')} title="Du er her" zIndexOffset={900} />;
}
