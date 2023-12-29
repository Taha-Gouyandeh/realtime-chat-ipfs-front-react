//@ts-nocheck
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Polyline,
  Tooltip,
  GeoJSON,
} from 'react-leaflet';
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { default as bezierSpline } from '@turf/bezier-spline';
import * as helpers from '@turf/helpers';
import { LocateFixed } from 'lucide-react';

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

export function ChangeView({ handleMapMove, handleMapMoveEnd }) {
  const map = useMap();
  const onMove = useCallback(() => {
    handleMapMove(map.getCenter());
  }, [map]);

  const onMoveEnd = useCallback(() => {
    handleMapMoveEnd(map.getCenter());
  }, [map]);

  useEffect(() => {
    map.on('move', onMove);
    map.on('moveend', onMoveEnd);
    return () => {
      map.off('move', onMove);
      map.off('moveend', onMoveEnd);
    };
  }, [map, onMove]);

  return null;
}

const DynamicMap: React.FC<{
  markerChange;
  location;
  height;
  originLoc?;
  destinationLoc?;
}> = ({ markerChange, location, height, originLoc, destinationLoc }) => {
  const [geoData, setGeoData] = useState({ lat: 35.7219, lng: 51.3347 });
  const markerRef = useRef(null);
  const [center, setCenter] = useState<number[]>([geoData.lat, geoData.lng]);
  const [change, setChange] = useState<boolean>(false);

  useEffect(() => {
    if (location) {
      setGeoData(location);
    }
  }, [location]);

  const handleMapMove = (data) => {
    setGeoData({ lat: data.lat, lng: data.lng });
  };
  const handleMapMoveEnd = (data) => {
    markerChange({ lat: data.lat, lng: data.lng });
  };

  const line = helpers.lineString(
    [
      [originLoc?.lat, originLoc?.lng],
      [
        originLoc?.lat > destinationLoc?.lat
          ? destinationLoc?.lat +
            (originLoc?.lat - destinationLoc?.lat) / 2 +
            0.1
          : destinationLoc?.lat -
            (destinationLoc?.lat - originLoc?.lat) / 2 +
            0.1,
        originLoc?.lng > destinationLoc?.lng
          ? destinationLoc?.lng + (originLoc?.lng - destinationLoc?.lng) / 2
          : destinationLoc?.lng - (destinationLoc?.lng - originLoc?.lng) / 2,
      ],
      [destinationLoc?.lat, destinationLoc?.lng],
    ].map((lngLat) => [lngLat[1], lngLat[0]]),
  );

  const curved = bezierSpline(line);

  const [position, setPosition] = useState([geoData.lat, geoData.lng]);
  const LocationMarker: React.FC<{ position; setPosition }> = ({
    position,
    setPosition,
  }) => {
    const map = useMap();

    if (position == null) {
      map.locate().on('locationfound', function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        setCenter(e.latlng);
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
      });
    }

    return position === null ? null : (
      <></>
      // <Marker position={position} icon={iconUser}></Marker>
    );
  };

  return (
    <MapContainer
      center={center}
      zoom={4}
      style={{ height: height, zIndex: 1 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <div
        className={'position-absolute bg-light rounded p-2 g-cursor-pointer'}
        style={{ bottom: '80px', right: '20px', zIndex: 1000 }}
        onClick={() => {
          // getUserLocation();
          setPosition(null);
        }}
      >
        <LocateFixed />
      </div>
      <LocationMarker position={position} setPosition={setPosition} />
      {geoData.lat && geoData.lng && (
        <Marker
          ref={markerRef}
          position={[geoData.lat, geoData.lng]}
          icon={icons}
        />
      )}
      {originLoc?.lat && originLoc?.lng && (
        <Marker
          ref={markerRef}
          position={[originLoc?.lat, originLoc?.lng]}
          icon={icons}
        >
          <Tooltip direction="top" permanent className="my-labels">
            origin
          </Tooltip>
        </Marker>
      )}
      {destinationLoc?.lat && destinationLoc?.lng ? (
        <Marker
          ref={markerRef}
          position={[destinationLoc?.lat, destinationLoc?.lng]}
          icon={icons}
        >
          <Tooltip direction="top" permanent className="my-labels">
            destination
          </Tooltip>
        </Marker>
      ) : (
        geoData.lat &&
        geoData.lng && (
          <>
            <Marker
              ref={markerRef}
              position={[geoData.lat, geoData.lng]}
              icon={icons}
            />
            <ChangeView
              handleMapMove={handleMapMove}
              handleMapMoveEnd={handleMapMoveEnd}
            />
          </>
        )
      )}
      {originLoc?.lat &&
        originLoc?.lng &&
        destinationLoc?.lat &&
        destinationLoc?.lng && (
          <>
            <Polyline
              positions={[
                [originLoc?.lat, originLoc?.lng],
                [destinationLoc?.lat, destinationLoc?.lng],
              ]}
              color="gray"
            />
            <GeoJSON data={curved} style={{ color: '#ff7726' }} />
          </>
        )}
      ;
      <LeafletgeoSearch />
    </MapContainer>
  );
};

export default DynamicMap;

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

const iconUser = L.icon({
  iconSize: [0, 0],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
  shadowUrl:
    'https://icons-for-free.com/iconfiles/ico/64/svg+direction+location+locator+navigation+user+icon-1320185157477749608.ico',
});
