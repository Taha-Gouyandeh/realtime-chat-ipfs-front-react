// @ts-nocheck
import { useState, useEffect, useRef, FC } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  GeoJSON,
  Polyline,
} from 'react-leaflet';
import L, { Popup } from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { Tooltip } from 'react-bootstrap';
import { default as bezierSpline } from '@turf/bezier-spline';
import * as helpers from '@turf/helpers';
import { t } from 'i18next';

interface GeoData {
  lat: number;
  lng: number;
}

interface ChangeViewProps {
  coords: [number, number];
}

interface StaticMapProps {
  location: GeoData;
}

function LeafletgeoSearch() {
  const map = useMap();
  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      marker: {
        icon,
      },
      style: 'bar',
    });

    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, []);

  return null;
}

function ChangeView({ coords }: ChangeViewProps) {
  const map = useMap();
  if (coords[0] != null) {
    map.setView(coords, 12);
  }
  return null;
}

export const StaticMap: FC<{
  location: { lat: number; lng: number };
  location2?: { lat: number; lng: number };
  height?: string;
}> = ({ location, location2, height }) => {
  const [geoData, setGeoData] = useState({ lat: 35.7219, lng: 51.3347 });
  const markerRef = useRef(null);
  const center = [geoData.lat, geoData.lng];

  useEffect(() => {
    if (location) {
      setGeoData(location);
    }
  }, []);

  function openGoogleMaps() {
    const url =
      location2 && location2.location.lat > 0
        ? `http://www.google.com/maps/dir/?api=1&origin=${[
            location.lat,
            location.lng,
          ]}&destination=${[location2.lat, location2.lng]}`
        : `https://www.google.com/maps/dir/?api=1&destination=${[
            geoData.lat,
            geoData.lng,
          ]}`;
    window.open(url, '_blank');
  }

  const line = helpers.lineString(
    [
      [location?.lat, location?.lng],
      [
        location?.lat > location2?.lat
          ? location2?.lat + (location?.lat - location2?.lat) / 2 + 0.1
          : location2?.lat - (location2?.lat - location?.lat) / 2 + 0.1,
        location?.lng > location2?.lng
          ? location2?.lng + (location?.lng - location2?.lng) / 2
          : location2?.lng - (location2?.lng - location?.lng) / 2,
      ],
      [location2?.lat, location2?.lng],
    ].map((lngLat) => [lngLat[1], lngLat[0]]),
  );

  const curved = bezierSpline(line);

  return (
    <MapContainer
      center={center}
      zoom={25}
      style={{
        height: height && height.length > 0 ? height : `300px`,
        zIndex: 1,
        width: '100%',
      }}
      doubleClickZoom={(e) => {}}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoData.lat && geoData.lng && (
        <Marker
          ref={markerRef}
          position={[location.lat, location.lng]}
          icon={icons}
        >
          {location2 && location2.lat > 0 && (
            <Tooltip direction="top" permanent className="my-labels">
              {t('origin')}
            </Tooltip>
          )}
        </Marker>
      )}

      {location2 && location2.lat > 0 && (
        <>
          <Marker
            ref={markerRef}
            position={[location2?.lat, location2?.lng]}
            icon={icons}
          >
            <Tooltip direction="top" permanent className="my-labels">
              {t('destination')}
            </Tooltip>
          </Marker>

          <Polyline
            positions={[
              [location?.lat, location?.lng],
              [location2?.lat, location2?.lng],
            ]}
            color="gray"
          />

          <GeoJSON data={curved} style={{ color: '#ff7726' }} />
        </>
      )}

      <button
        style={{
          zIndex: 500,
          position: 'absolute',
          bottom: 0,
          fontSize: '18px',
          backgroundColor: 'darkRed',
          color: 'white',
          cursor: 'pointer',
        }}
        onClick={openGoogleMaps}
      >
        {t('direction')}
      </button>
      <LeafletgeoSearch />
      <ChangeView coords={center} />
    </MapContainer>
  );
};

const icon = L.icon({
  iconSize: [0, 0],
  iconAnchor: [0, 0],
  popupAnchor: [0, 0],
  iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
});

const icons = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
});
