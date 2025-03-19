'use clinet';

import L from 'leaflet';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

interface MapProps {
    center?: number[];
}

const Map: React.FC<MapProps> = ({ center }) => {
    return (
        <MapContainer
            center={(center as L.LatLngExpression) || [51, -0.09]}
            zoom={center ? 4 : 2}
            scrollWheelZoom={false}
            className="h-[35vh] rounded-lg"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {center && (
                <Marker
                    position={center as L.LatLngExpression}
                    icon={
                        new L.Icon({
                            iconUrl: markerIcon.src,
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            tooltipAnchor: [16, -28],
                            shadowSize: [41, 41],
                        })
                    }
                />
            )}
        </MapContainer>
    );
};

export default Map;
