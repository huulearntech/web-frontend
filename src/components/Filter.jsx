import { useQueryState } from 'nuqs';
import { Slider, Input, Checkbox, Collapse } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const FilterCategory = ({ name, options, selectedOptions, onChange }) => {
  return (
    <Collapse
      expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
      defaultActiveKey={[name]}
    >
      <Collapse.Panel header={<span className="font-semibold">{name}</span>} key={name}>
        <Checkbox.Group
          options={options.map(option => ({ label: option, value: option }))}
          style={{ width: '100%' }}
          value={selectedOptions}
          onChange={(checkedValues) => onChange(name, checkedValues)}
        >
        </Checkbox.Group>
      </Collapse.Panel>
    </Collapse>
  );
};

const PriceRange = ({ minPrice, maxPrice, onSliderChange, onInputChange }) => {
  return (
    <div className="w-full bg-white border border-gray-300 rounded-lg p-4">
      <h3 className="font-semibold">Khoảng giá</h3>
      <p className="text-sm text-gray-500 mb-2">1 phòng, 1 đêm (VND)</p>
      <Slider
        range
        min={100_000}
        max={20_000_000}
        step={100_000}
        value={[minPrice, maxPrice]}
        onChange={onSliderChange}
        tooltip={{ formatter: (value) => `VND ${value.toLocaleString('vi-VN')}` }}
      />
      <div className="flex space-x-2">
        <Input
          type="text"
          id="minPrice"
          name="minPrice"
          placeholder="Min Price"
          value={minPrice.toLocaleString('vi-VN')}
          onChange={onInputChange}
        />
        <span className="self-center">-</span>
        <Input
          type="text"
          id="maxPrice"
          name="maxPrice"
          placeholder="Max Price"
          value={maxPrice.toLocaleString('vi-VN')}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

const Filter = () => {
  const [filter, setFilter] = useQueryState(
    'filter',
    {
      defaultValue: '',
      parse: (value) => value || '',
      stringify: (value) => value,
    }
  );
  const handleSliderChange = useCallback((value) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  }, []);
  return (
    <div>
      some text
    </div>
  );
};

export default Filter;