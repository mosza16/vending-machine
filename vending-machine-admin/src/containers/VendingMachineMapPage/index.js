import { useState, useEffect } from 'react';
import { path } from 'ramda';
import { useLazyQuery, gql } from '@apollo/client';
import { Row, Col, Table } from 'antd';
import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerClusterer,
} from '@react-google-maps/api';
import districts from '../../utils/thailand-location/districts.json';
import provinces from '../../utils/thailand-location/provinces.json';
import subDistricts from '../../utils/thailand-location/subDistricts.json';

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 13.736717,
  lng: 100.523186,
};

const columns = [
  {
    title: 'Code',
    dataIndex: 'machineCode',
    width: 150,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const GET_VENDING_MACHINES = gql`
  query VendingMachines($page: Int!, $limit: Int!) {
    vendingMachines(page: $page, limit: $limit) {
      count
      rows {
        machineId
        machineCode
        location {
          provinceCode
          districtCode
          subdistrictCode
          latitude
          longitude
        }
      }
    }
  }
`;
function getAddressNameFromJson(vendingMachine) {
  const provinceCode = path(['location', 'provinceCode'], vendingMachine);
  const province = provinces.find(
    ({ PROVINCE_CODE }) => PROVINCE_CODE === provinceCode
  );
  const provinceName = path(['PROVINCE_NAME'], province);
  const districtCode = path(['location', 'districtCode'], vendingMachine);
  const district = districts.find(
    ({ DISTRICT_CODE }) => DISTRICT_CODE === districtCode
  );
  const districtName = path(['DISTRICT_NAME'], district);
  const subdistrictCode = path(['location', 'subdistrictCode'], vendingMachine);
  const subDistrict = subDistricts.find(
    ({ SUB_DISTRICT_CODE }) => SUB_DISTRICT_CODE === subdistrictCode
  );
  const subDistrictName = path(['SUB_DISTRICT_NAME'], subDistrict);
  return {
    provinceName,
    districtName,
    subDistrictName,
  };
}

function VendingMachineMapPage() {
  const limit = 10;
  const [vendingMachinesLocation, setVendingMachinesLocation] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [getVendingMachines] = useLazyQuery(GET_VENDING_MACHINES, {
    onCompleted: (data) => {
      const vendingMachines = path(['vendingMachines', 'rows'], data);
      const totalVendingMachines =
        path(['vendingMachines', 'count'], data) || 0;
      const _vendingMachinesLocation = vendingMachines.map((vendingMachine) => {
        const {
          provinceName,
          districtName,
          subDistrictName,
        } = getAddressNameFromJson(vendingMachine);
        return {
          key: path(['machineId'], vendingMachine),
          machineId: path(['machineId'], vendingMachine),
          machineCode: path(['machineCode'], vendingMachine),
          province: provinceName,
          district: districtName,
          subDistrict: subDistrictName,
          address: `${subDistrictName} ${districtName} ${provinceName}`,
          lat: Number(path(['location', 'latitude'], vendingMachine) || 0),
          lng: Number(path(['location', 'longitude'], vendingMachine) || 0),
        };
      });
      setVendingMachinesLocation(_vendingMachinesLocation);
      setTotal(totalVendingMachines);
    },
  });

  useEffect(() => {
    getVendingMachines({
      variables: {
        page,
        limit,
      },
    });
  }, [page, getVendingMachines]);

  const onTableChange = (pagination) => {
    const { current } = pagination;
    setPage(current);
  };

  return (
    <Row>
      <Col lg={14} md={24} sm={24} xs={24}>
        <LoadScript googleMapsApiKey={API_KEY}>
          <GoogleMap
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
      </Col>
      <Col lg={10} md={24} sm={24} xs={24}>
        <Table
          columns={columns}
          dataSource={vendingMachinesLocation}
          pagination={{ pageSize: limit, current: page, total }}
          scroll={{ y: 400 }}
          onChange={onTableChange}
        />
      </Col>
    </Row>
  );
}

export default VendingMachineMapPage;
