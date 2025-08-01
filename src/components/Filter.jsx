import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPriceRange, setCheckboxGroup, setSortOrder } from '../store/filtersSlice';

import { Slider, Input, Checkbox, Collapse, Select, Flex } from 'antd';

// Why is that when I change only one of the filters, the others are re-rendered?
// According to Copilot, it is because the whole value in the context provider is changing,
// causing all components that consume the context to re-render.

// Haven't solved re-rendering issue yet, but I will try to use Redux for state management.

const PriceRange = () => {
  const priceRange = useSelector((state) => state.filters.priceRange);
  const dispatch = useDispatch();

  return (
    <div className="w-full bg-white border border-gray-300 rounded-lg p-4">
      <h3 className="text-sm font-semibold">Khoảng giá</h3>
      <p className="text-sm text-gray-500 mb-2">1 phòng, 1 đêm (VND)</p>
      <Slider
        range
        min={100_000}
        max={20_000_000}
        step={100_000}
        value={priceRange}
        onChange={value => dispatch(setPriceRange(value))}
        tooltip={{ formatter: (value) => `VND ${value.toLocaleString('vi-vn')}` }}
      />
      <div className="flex gap-2">
        <Input
          type="text"
          inputMode="numeric"
          name="minPrice"
          placeholder="Min Price"
          value={priceRange[0].toLocaleString('vi-vn')}
          onChange={(e) => {
            const value = parseInt(e.target.value.replace(/\D/g, ''), 10) || 0;
            dispatch(setPriceRange([value, priceRange[1]]));
          }}
          suffix="VND"
          size="small"
        />
        <span className="text-center">-</span>
        <Input
          type="text"
          inputMode="numeric"
          name="maxPrice"
          placeholder="Max Price"
          value={priceRange[1].toLocaleString('vi-vn')}
          onChange={(e) => {
            const value = parseInt(e.target.value.replace(/\D/g, ''), 10) || 0;
            dispatch(setPriceRange([priceRange[0], value]));
          }}
          suffix="VND"
          size="small"
        />
      </div>
    </div>
  );
};

const Filter = () => {
  const dispatch = useDispatch();
  const checkboxGroups = useSelector((state) => state.filters.checkboxGroups);

  const [filterCategories, setFilterCategories] = useState([]);
  useEffect(() => {
    // TODO: Implement API
    // Fetch filter categories from an API
    setFilterCategories([
      { id: 'amenities', label: 'Tiện nghi', options: ['WiFi', 'Parking', 'Pool', 'Gym'] },
      { id: 'propertyTypes', label: 'Loại hình lưu trú', options: ['Apartment', 'House', 'Condo', 'Villa'] },
    ]);
  }, []);

  return (
    <div className="w-full max-w-xs flex flex-col space-y-4">
      <button
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
        onClick={() => {
          dispatch(setSortOrder('Popularity'));
          dispatch(setPriceRange([100_000, 20_000_000]));
          filterCategories.forEach(category => {
            dispatch(setCheckboxGroup({ group: category.id, selectedOptions: [] }));
          });
        }}
      >
        Đặt lại bộ lọc
      </button>
      <PriceRange />
      {filterCategories.length > 0 && (
        <Collapse
          defaultActiveKey={filterCategories.map(category => category.id)}
          items={filterCategories.map(category => ({
            key: category.id,
            label: <span className="font-semibold">{category.label}</span>,
            children: (
              <Checkbox.Group
                value={checkboxGroups[category.id] || []}
                onChange={(checkedValues) => dispatch(
                  setCheckboxGroup({ group: category.id, selectedOptions: checkedValues })
                )}
              >
                <Flex vertical gap="small">
                  {category.options.map(option => (
                    <Checkbox
                      key={option}
                      value={option}
                      checked={checkboxGroups[category.id]?.includes(option)}
                    >
                      {option}
                    </Checkbox>
                  ))}
                </Flex>
              </Checkbox.Group>
            ),
          }))}
        />
      )}
    </div>
  );
};

export default Filter;