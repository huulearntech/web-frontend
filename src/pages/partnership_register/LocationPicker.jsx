import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';
import axios from 'axios';

const { Option } = Select;

const LocationPicker = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null); // New state for selected ward

  useEffect(() => {
    const fetchProvinces = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://open.oapi.vn/location/provinces?page=0&size=100&query=');
        setProvinces(response.data.data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  const handleProvinceChange = async (value) => {
    setSelectedProvince(value);
    setSelectedDistrict(null);
    setSelectedWard(null); // Reset selected ward
    setWards([]);
    setLoading(true);
    try {
      const response = await axios.get(`https://open.oapi.vn/location/districts/${value}?page=0&size=100&query=`);
      setDistricts(response.data.data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDistrictChange = async (value) => {
    setSelectedDistrict(value);
    setSelectedWard(null); // Reset selected ward
    setLoading(true);
    try {
      const response = await axios.get(`https://open.oapi.vn/location/wards/${value}?page=0&size=100&query=`);
      setWards(response.data.data);
    } catch (error) {
      console.error('Error fetching wards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWardChange = (value) => {
    setSelectedWard(value); // Update selected ward
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Province</label>
        <Select
          className="w-full"
          placeholder="Select a province"
          onChange={handleProvinceChange}
          loading={loading}
        >
          {provinces.map((province) => (
            <Option key={province.id} value={province.id}>
              {province.name}
            </Option>
          ))}
        </Select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">District</label>
        <Select
          className="w-full"
          placeholder="Select a district"
          onChange={handleDistrictChange}
          value={selectedDistrict}
          disabled={!selectedProvince}
          loading={loading}
        >
          {districts.map((district) => (
            <Option key={district.id} value={district.id}>
              {district.name}
            </Option>
          ))}
        </Select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Ward</label>
        <Select
          className="w-full"
          placeholder="Select a ward"
          onChange={handleWardChange} // Add onChange handler
          value={selectedWard} // Use selectedWard state
          disabled={!selectedDistrict}
          loading={loading}
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