'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Map, useMap, ColorScheme } from '@vis.gl/react-google-maps';

interface Location {
  id: number;
  lat: number;
  lng: number;
  title: string;
}

const MapOverlay = () => {
  const map = useMap() as google.maps.Map | null;
  const overlayRef = useRef<google.maps.GroundOverlay | null>(null);

  useEffect(() => {
    if (!map) return;

    if (overlayRef.current) {
      overlayRef.current.setMap(null);
    }

    const imageBounds = {
      north: 85,
      south: -85,
      east: 180,
      west: -180,
    };

    const overlay = new google.maps.GroundOverlay(
      'https://media-hosting.imagekit.io/0bdc8d07b4e74a3e/screenshot_1745496558629.png?Expires=1840104560&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=1oy1sUWYwdA83GE2XxplTBQ505DQW2V-4KAVt8IooR-GosMpU6L2GKKG4YVo7DVRgP1gr~t7tw8GmscILcuQDNZsJJ22B-yPBV0lDt7SLNIywDjZY9ibkuc2aGx06jvrKzgURk72PSelcwMIe2m4oGDRLXNv~2pXTeprBFWkSyDttAYlZA6B6lztiDzDo6puL7R-reN~VB-702~cDt9TK46INYcz2QFYnB37TDfRAkvCRP6i5X3crZEvuGjxBxr2AU1kml8EgOdkLyeR3zwx8zQyI-tF~1lIwIhC9qEqx0k0QqhEDEoM04zlTivkSw77TYBCx1RnHrOfejrg4Ktm1Q__',
      // "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Blue_Marble_2002.png/800px-Blue_Marble_2002.png",
      imageBounds,
      { opacity: 1 },
    );
    overlay.set('anchor', new google.maps.Point(0.5, 0.3));
    overlay.setMap(map);
    overlayRef.current = overlay;
    console.log('overlay==', overlayRef.current);

    return () => {
      overlay.setMap(null);
    };
  }, [map]);

  return null;
};

const ConnectionLines = ({ locations }: { locations: Location[] }) => {
  const mapContext = useMap();
  const map = mapContext;
  const linesRef = useRef<google.maps.Polyline[]>([]);

  useEffect(() => {
    if (!map) return;

    linesRef.current.forEach((line) => line.setMap(null));
    linesRef.current = [];

    for (let i = 0; i < locations.length - 1; i++) {
      const start = locations[i];
      const end = locations[i + 1];

      const line = new google.maps.Polyline({
        path: [
          { lat: start.lat, lng: start.lng },
          { lat: end.lat, lng: end.lng },
        ],
        geodesic: true,
        strokeColor: '#FF005D',
        strokeOpacity: 1,
        strokeWeight: 3,
        map,
      });

      linesRef.current.push(line);
    }

    return () => {
      linesRef.current.forEach((line) => line.setMap(null));
    };
  }, [map]);

  return null;
};

const LocationMarkers = ({ locations }: { locations: Location[] }) => {
  const mapContext = useMap();
  const map = mapContext as google.maps.Map | null;
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!map) return;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    const markerIcon = {
      url: '/worldmap-marker.png',
      scaledSize: new google.maps.Size(40, 40),
      anchor: new google.maps.Point(20, 20),
    };

    const infoWindow = new google.maps.InfoWindow();

    locations.forEach((location, index) => {
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map,
        title: location.title,
        icon: markerIcon,
        animation: google.maps.Animation.DROP,
      });

      // Floating index next to the marker
      const indexLabel = new google.maps.InfoWindow({
        content: `<div style="background-color: #FF005D; color: white; padding: 5px; border-radius: 50%; font-size: 14px; text-align: center;">${index + 1}</div>`,
        position: { lat: location.lat, lng: location.lng },
      });

      markersRef.current.push(marker);

      // Show Tooltip on Hover
      marker.addListener('mouseover', () => {
        infoWindow.setContent(`
                    <div style="font-size: 14px; color: black;">
                        <strong>${location.title}</strong><br/>
                        Latitude: ${location.lat}<br/>
                        Longitude: ${location.lng}
                    </div>
                `);
        infoWindow.open(map, marker);

        // Hide the close button once the InfoWindow is ready
        google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
          const closeButton = document.querySelector('.gm-ui-hover-effect');
          if (closeButton instanceof HTMLElement)
            closeButton.style.display = 'none';
        });
      });

      marker.addListener('mouseout', () => {
        infoWindow.close();
      });

      // Show Floating Index (similar to a custom label)
      // indexLabel.open(map);
    });

    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
    };
  }, [map]);

  return null;
};

const WorldMap = () => {
  const locations = [
    { id: 1, lat: 40.7128, lng: -74.006, title: 'New York' },
    { id: 7, lat: 41.8781, lng: -87.6298, title: 'Chicago' },
    { id: 8, lat: 29.7604, lng: -95.3698, title: 'Houston' },
    { id: 6, lat: 34.0522, lng: -118.2437, title: 'Los Angeles' },
    { id: 5, lat: 37.7749, lng: -122.4194, title: 'San Francisco' },
  ];

  const mapContext = useMap();
  const map = mapContext as google.maps.Map | null;
  const [loading, setLoading] = useState(true);

  const northBound = 85;
  const southBound = -85;
  const eastBound = 180;
  const westBound = -180;

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: false,
    scaleControl: false,
    restriction: {
      latLngBounds: {
        north: northBound,
        south: southBound,
        east: eastBound,
        west: westBound,
      },
      strictBounds: true,
    },
  };

  useEffect(() => {
    if (map) {
      setLoading(false);
      map.setOptions({
        gestureHandling: 'greedy',
      });
    }
  }, [map]);

  return (
    <div className="w-full relative mx-auto h-[250px] lg:h-[600px]  border-0 rounded-none border-gray-700 overflow-hidden">
      <Map
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: 0,
          borderRadius: 'inherit',
          border: 'none',
        }}
        defaultCenter={{ lat: locations[0].lat, lng: locations[0].lng }}
        defaultZoom={3}
        gestureHandling="greedy"
        disableDefaultUI={false}
        colorScheme={ColorScheme.DARK}
        restriction={mapOptions.restriction}
      >
        <ConnectionLines locations={locations} />
        <LocationMarkers locations={locations} />
      </Map>
    </div>
  );
};

export default WorldMap;
