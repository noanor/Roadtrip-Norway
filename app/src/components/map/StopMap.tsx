import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { config } from '../../config';
import type { Stop } from '../../types';
import { iconMarkup } from '../Icon';
import { pinIcon } from './markers';

export function StopMap({ stop }: { stop: Stop }) {
  return (
    <div className="mapwrap stopmap">
      <MapContainer key={stop.id} className="lmap" center={stop.location} zoom={11} scrollWheelZoom={false}>
        <TileLayer url={config.tileUrl} attribution={config.tileAttribution} maxZoom={18} />
        <Marker position={stop.location} icon={pinIcon('cur', iconMarkup('pin'))} title={stop.name} />
      </MapContainer>
    </div>
  );
}
