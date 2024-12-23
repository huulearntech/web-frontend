import { Checkbox, Collapse } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const FilterCategory = ({ name, characteristics, selectedCharacteristics, onChange }) => {
  return (
    <Collapse
      expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
      className="bg-white border border-gray-300 rounded-lg"
      defaultActiveKey={[name]}
    >
      <Collapse.Panel header={<span className="font-semibold">{name}</span>} key={name}>
        <div className="flex flex-col space-y-2">
          {characteristics.map((characteristic) => (
            <Checkbox
              key={characteristic}
              className='hover:text-blue-500 transition-colors duration-300 ease-in-out'
              checked={selectedCharacteristics.includes(characteristic)}
              onChange={() => onChange(name, characteristic)}
            >
              {characteristic}
            </Checkbox>
          ))}
        </div>
      </Collapse.Panel>
    </Collapse>
  );
};

export default FilterCategory;
