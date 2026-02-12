import { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './LocationPicker.css';

// Fix for default marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const LocationMarker = ({ position, setPosition }) => {
    const map = useMap();

    useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    useEffect(() => {
        if (position) {
            map.flyTo(position, map.getZoom());
        }
    }, [position, map]);

    return position === null ? null : (
        <Marker position={position} />
    );
};

const LocationPicker = ({ lat, lng, onChange }) => {
    const [position, setPosition] = useState(lat && lng ? [lat, lng] : [13.0827, 80.2707]); // Default to Chennai
    const [loading, setLoading] = useState(false);

    const handleSetPosition = useCallback((newPos) => {
        setPosition(newPos);
        onChange(newPos[0], newPos[1]);
    }, [onChange]);

    const detectLocation = () => {
        setLoading(true);
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                handleSetPosition([latitude, longitude]);
                setLoading(false);
            },
            (err) => {
                console.error("Geolocation error:", err);
                alert("Unable to retrieve your location. Check browser permissions.");
                setLoading(false);
            },
            { enableHighAccuracy: true }
        );
    };

    return (
        <div className="location-picker-container">
            <div className="location-picker-header">
                <button
                    type="button"
                    className="location-detect-btn"
                    onClick={detectLocation}
                    disabled={loading}
                >
                    <span className="icon">🎯</span>
                    {loading ? 'Detecting...' : 'Detect My Live Location'}
                </button>
                <div className="coords-display">
                    <span>Lat: {position[0].toFixed(6)}</span>
                    <span>Lng: {position[1].toFixed(6)}</span>
                </div>
            </div>

            <div className="map-frame">
                <MapContainer
                    center={position}
                    zoom={13}
                    scrollWheelZoom={true}
                    className="leaflet-map-container"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker position={position} setPosition={handleSetPosition} />
                </MapContainer>
                <div className="map-hint">Click on map to pick area</div>
            </div>
        </div>
    );
};

export default LocationPicker;
