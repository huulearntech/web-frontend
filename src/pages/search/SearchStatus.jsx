import { Select } from "antd";
import {
  CiBoxList as ListViewIcon,
  CiGrid41 as GridViewIcon,
} from "react-icons/ci";


const SearchStatus = ({ location, found, onChange, isListView, setIsListView }) => {
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <div className="flex flex-col">
        <h3 className="text-sm font-semibold">{location}</h3>
        <p className="text-sm text-gray-500">{found} nơi lưu trú được tìm thấy</p>
      </div>

      <div className="flex space-x-4">
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Sắp xếp theo:</span>
          <Select
            onChange={(value) => onChange(value)} // Replace with your sorting logic
            defaultValue="price-asc"
            className="w-40 h-8"
          >
            <Select.Option value="price-asc"> Giá tăng dần</Select.Option>
            <Select.Option value="price-desc">Giá giảm dần</Select.Option>
            <Select.Option value="rating">Điểm đánh giá</Select.Option>
            <Select.Option value="popularity">Độ phổ biến</Select.Option>
          </Select>
        </div>

        {/* Toggle view mode */}
        <div className="flex items-center justify-center">
          <span className="text-sm text-gray-500 mr-2">Chế độ xem:</span>
          <div className="flex">
            <button
              onClick={() => setIsListView(true)}
              className={`w-10 h-8 flex items-center justify-center rounded-l-md transition ${isListView ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              aria-label="List view"
            >
              <ListViewIcon className="text-xl" />
            </button>
            <button
              onClick={() => setIsListView(false)}
              className={`w-10 h-8 flex items-center justify-center rounded-r-md transition ${!isListView ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              aria-label="Grid view"
            >
              <GridViewIcon className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchStatus;  