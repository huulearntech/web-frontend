import { Slider, Input, Checkbox, Collapse } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setPriceRange, setAmenities, setPropertyTypes, setSortOrder } from '../store/filtersSlice';


// Why is that when I change only one of the filters, the others are re-rendered?
// According to Copilot, it is because the whole value in the context provider is changing,
// causing all components that consume the context to re-render.
const FilterCategory = ({ name, options, selectedOptions, onChange }) => {
  return (
    <Collapse
      expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
      defaultActiveKey={[name]}
      items={[
        {
          key: name,
          label: <span className="font-semibold">{name}</span>,
          children:
            <Checkbox.Group
              options={options}
              value={selectedOptions}
              onChange={(checkedValues) => onChange(name, checkedValues)}
            />
        }
      ]}
    />
  );
};

const PriceRange = () => {
  const priceRange = useSelector((state) => state.filters.priceRange);
  const dispatch = useDispatch();

  return (
    <div className="w-full bg-white border border-gray-300 rounded-lg p-4">
      <h3 className="font-semibold">Khoảng giá</h3>
      <p className="text-sm text-gray-500 mb-2">1 phòng, 1 đêm (VND)</p>
      <Slider
        range
        min={100_000}
        max={20_000_000}
        step={100_000}
        value={priceRange}
        onChange={value => dispatch(setPriceRange(value))}
        tooltip={{ formatter: (value) => `VND ${value.toLocaleString('vi-VN')}` }}
      />
      <div className="flex space-x-2">
        <Input
          type="text"
          id="minPrice"
          name="minPrice"
          placeholder="Min Price"
          value={priceRange[0].toLocaleString('vi-VN')}
          onChange={(e) => {
            const value = parseInt(e.target.value.replace(/\D/g, ''), 10) || 0;
            dispatch(setPriceRange([value, priceRange[1]]));
          }}
        />
        <span className="self-center">-</span>
        <Input
          type="text"
          id="maxPrice"
          name="maxPrice"
          placeholder="Max Price"
          value={priceRange[1].toLocaleString('vi-VN')}
          onChange={(e) => {
            const value = parseInt(e.target.value.replace(/\D/g, ''), 10) || 0;
            dispatch(setPriceRange([priceRange[0], value]));
          }}
        />
      </div>
    </div>
  );
};

const Filter = () => {
  const { amenities, propertyTypes, sortOrder } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  return (
    <div>
      <PriceRange />
      <FilterCategory
        name="Amenities"
        options={['WiFi', 'Parking', 'Pool', 'Gym']}
        selectedOptions={amenities || []}
        onChange={(_, checkedValues) => {
          dispatch(setAmenities(checkedValues));
        }}
      />
      <FilterCategory
        name="Property Types"
        options={['Apartment', 'House', 'Condo', 'Villa']}
        selectedOptions={propertyTypes || []}
        onChange={(_, checkedValues) => {
          dispatch(setPropertyTypes(checkedValues));
        }}
      />
      <FilterCategory
        name="Sort Order"
        options={['Relevance', 'Price: Low to High', 'Price: High to Low']}
        selectedOptions={[sortOrder || 'Relevance']}
        onChange={(_, checkedValues) => {
          dispatch(setSortOrder(checkedValues[0]));
        }}
      />
      <div className="mt-4">
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => {
            dispatch(setAmenities([]));
            dispatch(setPropertyTypes([]));
            dispatch(setSortOrder('Relevance'));
          }}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;