import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const LocationPicker = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provincesLoading, setProvincesLoading] = useState(false);
  const [districtsLoading, setDistrictsLoading] = useState(false);
  const [wardsLoading, setWardsLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      setProvincesLoading(true);
      try {
        const response = await axios.get('https://open.oapi.vn/location/provinces?page=0&size=100&query=');
        setProvinces(response.data.data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      } finally {
        setProvincesLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  const handleProvinceChange = async (value) => {
    setSelectedProvince(value);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setWards([]);
    setDistrictsLoading(true);
    try {
      const response = await axios.get(`https://open.oapi.vn/location/districts/${value}?page=0&size=100&query=`);
      setDistricts(response.data.data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    } finally {
      setDistrictsLoading(false);
    }
  };

  const handleDistrictChange = async (value) => {
    setSelectedDistrict(value);
    setSelectedWard(null);
    setWardsLoading(true);
    try {
      const response = await axios.get(`https://open.oapi.vn/location/wards/${value}?page=0&size=100&query=`);
      setWards(response.data.data);
    } catch (error) {
      console.error('Error fetching wards:', error);
    } finally {
      setWardsLoading(false);
    }
  };

  const handleWardChange = (value) => {
    setSelectedWard(value);
  };

  return (
    <div>
      <div>
        <label>Province</label>
        <Select
          placeholder="Select a province"
          onChange={handleProvinceChange}
          loading={provincesLoading}
        >
          {provinces.map((province) => (
            <Option key={province.id} value={province.id}>
              {province.name}
            </Option>
          ))}
        </Select>
      </div>
      <div>
        <label>District</label>
        <Select
          placeholder="Select a district"
          onChange={handleDistrictChange}
          value={selectedDistrict}
          disabled={!selectedProvince}
          loading={districtsLoading}
        >
          {districts.map((district) => (
            <Option key={district.id} value={district.id}>
              {district.name}
            </Option>
          ))}
        </Select>
      </div>
      <div>
        <label>Ward</label>
        <Select
          placeholder="Select a ward"
          onChange={handleWardChange}
          value={selectedWard}
          disabled={!selectedDistrict}
          loading={wardsLoading}
        >
          {wards.map((ward) => (
            <Option key={ward.id} value={ward.id}>
              {ward.name}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default LocationPicker;