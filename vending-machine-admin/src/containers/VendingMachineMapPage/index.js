import { useState } from 'react';
import { path } from 'ramda';
import { useLazyQuery, gql } from '@apollo/client';

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

const GET_VENDING_MACHINES = gql`
  query VendingMachines($page: Int!, $limit: Int!) {
    vendingMachines(page: $page, limit: $limit) {
      rows {
        machineId
        machineCode
        location {
          latitude
          longitude
        }
      }
    }
  }
`;
function VendingMachineMapPage() {
  const [vendingMachinesLocation, setVendingMachinesLocation] = useState([]);
  const [getVendingMachines] = useLazyQuery(GET_VENDING_MACHINES, {
    onCompleted: (data) => {
      const vendingMachines = path(['vendingMachines', 'rows'], data);
      const _vendingMachinesLocation = vendingMachines.map(
        (vendingMachine) => ({
          machineId: path(['machineId'], vendingMachine),
          machineCode: path(['machineCode'], vendingMachine),
          lat: Number(path(['location', 'latitude'], vendingMachine) || 0),
          lng: Number(path(['location', 'longitude'], vendingMachine) || 0),
        })
      );
      setVendingMachinesLocation(_vendingMachinesLocation);
    },
  });
  const onLoad = () => {
    getVendingMachines({
      variables: { page: 1, limit: 1000 },
    });
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        onLoad={onLoad}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <MarkerClusterer options={{ maxZoom: 15 }}>
          {(clusterer) =>
            vendingMachinesLocation.map(({ lat, lng, machineCode }) => (
              <Marker
                title={machineCode}
                key={`${lat}${lng}`}
                position={{ lat, lng }}
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
