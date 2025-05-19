"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import customMarkerIcon from "@/public/global.png";

// Create custom icon using your imported image
const CustomIcon = L.icon({
  iconUrl: customMarkerIcon.src, // Use your imported image
  iconSize: [40, 40], // Adjust based on your image dimensions
  iconAnchor: [20, 40], // Center point of the icon
  popupAnchor: [0, -40], // Position of popup relative to icon
  // Remove shadow if not needed
});

// Set custom icon as default
L.Marker.prototype.options.icon = CustomIcon;

interface LeafletMapProps {
  center: [number, number];
  zoom?: number;
  markerText?: string;
  className?: string;
}

const LeafletMap = ({
  center,
  zoom = 13,
  markerText = "Location",
  className = "h-[400px] w-full",
}: LeafletMapProps) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      className={`rounded-lg z-0 ${className}`}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center}>
        {markerText && <Popup>{markerText}</Popup>}
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;