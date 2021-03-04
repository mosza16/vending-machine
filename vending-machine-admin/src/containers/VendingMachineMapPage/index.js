import { useState, useEffect, useCallback } from 'react';
import { Layout, Row, Col, Tag, Spin, Popover, Button } from 'antd';
import { path } from 'ramda';
import { useLazyQuery, useMutation, gql } from '@apollo/client';

import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerClusterer,
} from '@react-google-maps/api';

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 13.736717,
  lng: 100.523186,
};

const locations = [
  {
    lat: 13.736717,
    lng: 100.523186,
  },
  {
    lat: 13.736718,
    lng: 100.523186,
  },
  {
    lat: 13.836718,
    lng: 100.523189,
  },
];

function VendingMachineMapPage() {
  const onLoad = useCallback(function onLoad(mapInstance) {});
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        onLoad={onLoad}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={3}
      >
        <MarkerClusterer options={{ maxZoom: 15 }}>
          {(clusterer) =>
            locations.map((location) => (
              <Marker
                title="E0002"
                key={`${location.lat}${location.lng}`}
                position={location}
                clusterer={clusterer}
              />
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
    </LoadScript>
  );
}

export default VendingMachineMapPage;
