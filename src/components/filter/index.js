import React, { useState } from 'react';
import { Button } from 'antd';
import PriceRange from './PriceRange';
import FilterCategory from './FilterCategory';

const Filter = ({ onApply }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedCharacteristics, setSelectedCharacteristics] = useState({
    'Điểm đánh giá': [],
    'Loại hình lưu trú': [],
    'Tiện nghi': []
  });

  const handleSliderChange = (value) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value.replace(/\D/g, "");
    if (name === 'minPrice') {
      setMinPrice(value ? parseInt(value, 10) : 0);
    } else {
      setMaxPrice(value ? parseInt(value, 10) : 1000);
    }
  };

  const handleCheckboxChange = (category, characteristic) => {
    setSelectedCharacteristics((prev) => {
      const newSelected = { ...prev };
      if (newSelected[category].includes(characteristic)) {
        newSelected[category] = newSelected[category].filter((item) => item !== characteristic);
      } else {
        newSelected[category].push(characteristic);
      }
      return newSelected;
    });
  };

  const handleApplyFilters = () => {
    const filters = {
      minPrice,
      maxPrice,
      selectedCharacteristics
    };
    // Send filters to the server
    console.log('Filters to send:', filters);
    // Example: axios.post('/api/filters', filters);
  };

  const handleResetFilters = () => {
    setMinPrice(0);
    setMaxPrice(1000);
    setSelectedCharacteristics({
      'Điểm đánh giá': [],
      'Loại hình lưu trú': [],
      'Tiện nghi': []
    });
  };

  return (
    <div className="w-60 space-y-4">
      <div className="flex justify-between space-x-6">
        <Button
          className="w-full bg-gray-300 text-gray-700 hover:bg-gray-200 font-semibold"
          onClick={handleResetFilters}
        >
          Đặt lại
        </Button>
        <Button
          type="primary"
          className="w-full bg-blue-500 hover:bg-blue-400 font-semibold"
          onClick={onApply}
        >
          Áp dụng
        </Button>
      </div>
      <PriceRange
        minPrice={minPrice}
        maxPrice={maxPrice}
        onSliderChange={handleSliderChange}
        onInputChange={handleInputChange}
      />
      <FilterCategory
        name="Điểm đánh giá"
        characteristics={['1 sao', '2 sao', '3 sao', '4 sao', '5 sao']}
        selectedCharacteristics={selectedCharacteristics['Điểm đánh giá']}
        onChange={handleCheckboxChange}
      />
      <FilterCategory
        name="Loại hình lưu trú"
        characteristics={['Hotel', 'Hostel', 'Motel', 'Resort', 'Inn', 'Villa']}
        selectedCharacteristics={selectedCharacteristics['Loại hình lưu trú']}
        onChange={handleCheckboxChange}
      />
      <FilterCategory
        name="Tiện nghi"
        characteristics={['Free Wi-Fi', 'Free Parking', 'Swimming Pool', 'Airport Shuttle', 'Pet Friendly']}
        selectedCharacteristics={selectedCharacteristics['Tiện nghi']}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};

export default Filter;