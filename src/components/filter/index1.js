import React from 'react';
import { Button } from 'antd';
import PriceRange from './PriceRange';
import FilterCategory from './FilterCategory';

const Filter = ({
  minPrice,
  maxPrice,
  selectedCharacteristics,
  onSliderChange,
  onPriceInputChange,
  onCheckboxChange,
  onApplyFilters,
  onResetFilters
}) => {
  return (
    <div className="w-64 space-y-4">
      <div className="flex justify-between space-x-6">
        <Button className="w-full bg-gray-300 text-gray-700 hover:bg-gray-200 font-semibold" onClick={onResetFilters}>
          Đặt lại
        </Button>
        <Button type="primary" className="w-full bg-blue-500 hover:bg-blue-400 font-semibold" onClick={onApplyFilters}>
          Áp dụng
        </Button>
      </div>
      <PriceRange
        minPrice={minPrice}
        maxPrice={maxPrice}
        onSliderChange={onSliderChange}
        onInputChange={onPriceInputChange}
      />
      <FilterCategory
        name="Điểm đánh giá"
        characteristics={['1 sao', '2 sao', '3 sao', '4 sao', '5 sao']}
        selectedCharacteristics={selectedCharacteristics['Điểm đánh giá']}
        onChange={onCheckboxChange}
      />
      <FilterCategory
        name="Loại hình lưu trú"
        characteristics={['Hotel', 'Hostel', 'Motel', 'Resort', 'Inn', 'Villa']}
        selectedCharacteristics={selectedCharacteristics['Loại hình lưu trú']}
        onChange={onCheckboxChange}
      />
      <FilterCategory
        name="Tiện nghi"
        characteristics={['Free Wi-Fi', 'Free Parking', 'Swimming Pool', 'Airport Shuttle', 'Pet Friendly']}
        selectedCharacteristics={selectedCharacteristics['Tiện nghi']}
        onChange={onCheckboxChange}
      />
    </div>
  );
};

export default Filter;