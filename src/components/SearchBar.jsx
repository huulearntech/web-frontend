import { useState, useEffect, useCallback } from "react";

import { Button, Input, Tooltip, DatePicker, AutoComplete, Dropdown, Form } from "antd";
import {
  SearchOutlined,
  CloseCircleFilled,
  PlusOutlined,
  MinusOutlined,
  CalendarTwoTone
} from "@ant-design/icons";
import { useSearchBar } from "../contexts/SearchBarContext";
import searchServices from "../services/searchServices";

const map_pin_icon = "https://d1785e74lyxkqq.cloudfront.net/_next/static/v4.6.0/7/7f57d24fd3db681418a3694bd71cb93b.svg";
const adult_icon = "https://d1785e74lyxkqq.cloudfront.net/_next/static/v4.6.0/4/4c4f475da027590bc183e3debcba1a91.svg";
const children_icon = "https://d1785e74lyxkqq.cloudfront.net/_next/static/v4.6.0/a/a5bc5e133ac74e2be6308b545ec556eb.svg";
const room_icon = "https://d1785e74lyxkqq.cloudfront.net/_next/static/v4.6.0/c/c129054df5ccd27157e3257819d5af9d.svg";
const guest_and_room_icon = "https://d1785e74lyxkqq.cloudfront.net/_next/static/v4.6.0/a/ae73fa0a5c08e7064d9dafe34d1408e8.svg";

function debounce(func, delay) {
  let timer; // Holds the timeout ID

  return function (...args) {
    const context = this; // Preserve the context of `this`

    // Clear the previous timer if the function is called again
    clearTimeout(timer);

    // Set a new timer
    timer = setTimeout(() => {
      func.apply(context, args); // Execute the function with the correct context and arguments
    }, delay);
  };
}

const MyButton = ({ onClick, disabled, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-2 py-1 rounded
      ${disabled ? "bg-gray-100 text-gray-400"
      : "bg-blue-50 hover:bg-blue-100 text-blue-600"}`}
  >
    {children}
  </button>
);

const SearchBar = () => {
  const { location, setLocation, checkInOut, setCheckInOut,
    guestsAndRooms, setGuestsAndRooms, warningAdultRoom, setWarningAdultRoom } = useSearchBar();
  const handleSubmit = () => {
    fetchOptions(location); // Fetch options when the form is submitted
    console.log("Search submitted");
    console.log("Location:", location);
    console.log("Check-in/Check-out:", checkInOut);
    console.log("Guests and Rooms:", guestsAndRooms);
  };

  const [options, setOptions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const fetchOptions = useCallback(
    debounce(async (location) => {
      try {
        const results = await searchServices.getLocationsContaining(location);
        setOptions(results.map(result => ({
          value: result.name,
          label: (
            <div className="flex flex-row items-center justify-center h-8">
              <div className="flex flex-row w-full justify-between">
                <span className="font-semibold text-blue-500">{result.name}</span>
                {/* <span className="text-xs text-gray-500">{result.count + " kết quả"}</span> */}
              </div>
            </div>
          )
        })));
      } catch (error) {
        console.error("Error fetching location options:", error);
      }
    }, 500),
    []
  );
  useEffect(() => {
    fetchOptions(location);
  }, [location]);

  // FIXME: Change Form to something else because antd's Form is pre-styled
  return (
    <div className="w-7xl p-4 bg-white rounded-lg shadow-md">
      <Form
        onFinish={handleSubmit}
        layout="inline"
      >
        <Form.Item
          name="location"
          label="Thành phố, địa điểm hoặc tên khách sạn"
          layout="vertical"
          style={{ width: "27%" }}
        >
          <AutoComplete
            options={options}
            allowClear={{ clearIcon: <CloseCircleFilled style={{ fontSize: "14px" }} /> }}
            onChange={setLocation}
            value={location}
            size="large"
            prefix={<img src={map_pin_icon} alt="Map Pin Icon" className="size-5 mr-1" />}
            placeholder="Thành phố, khách sạn, điểm đến"
          />
        </Form.Item>
        <Form.Item
          name="checkInOut"
          label="Ngày nhận phòng và trả phòng"
          layout="vertical"
          style={{ width: "27%" }}
        >
          <DatePicker.RangePicker
            placeholder={["Ngày nhận", "Ngày trả"]}
            prefix={<CalendarTwoTone style={{ fontSize: "20px", marginRight: "4px" }} />}
            suffixIcon={null}
            format={"DD/MM/YYYY"}
            value={checkInOut}
            onChange={(dates) => setCheckInOut(dates)}
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="guestsAndRooms"
          label="Khách và Phòng"
          layout="vertical"
          style={{ width: "27%" }}
        >
          <Dropdown
            trigger={["click"]}
            open={dropdownVisible}
            onOpenChange={setDropdownVisible}
            popupRender={_ => (
              <div className="flex flex-col p-4 bg-white rounded-lg shadow-xl">
                <div className="flex flex-row items-center justify-between mb-4">
                  <label htmlFor="adults-input" className="text-base inline-flex items-center">
                    <img src={adult_icon} alt="Adult Icon" className="size-5 mr-1"/>
                    Người lớn:
                  </label>
                  <div className="flex flex-row items-center">
                    <MyButton
                      onClick={() => {
                        if (guestsAndRooms.adults > guestsAndRooms.rooms) {
                          setGuestsAndRooms(prev => ({ ...prev, adults: prev.adults - 1 }));
                        } else {
                          setWarningAdultRoom(true);
                          setTimeout(() => {
                            setWarningAdultRoom(false);
                          }, 2000);
                        }
                      }}
                      disabled={guestsAndRooms.adults === 1}
                    >
                      <MinusOutlined />
                    </MyButton>
                    <span className="w-12 p-1 text-center text-base border-b border-gray-300" id="adults-input">{guestsAndRooms.adults}</span>
                    <MyButton
                      onClick={() => setGuestsAndRooms(prev => ({ ...prev, adults: prev.adults + 1 }))}
                      disabled={guestsAndRooms.adults === 30} // Assuming 30 is the max limit
                    >
                      <PlusOutlined />
                    </MyButton>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between mb-4">
                  <label htmlFor="children-input" className="text-base inline-flex items-center">
                    <img src={children_icon} alt="Children Icon" className="size-5 mr-1" />
                    Trẻ em:
                  </label>
                  <div className="flex flex-row items-center">
                    <MyButton
                      onClick={() => setGuestsAndRooms(prev =>
                        ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                      disabled={guestsAndRooms.children === 0}
                    >
                      <MinusOutlined />
                    </MyButton>
                    <span className="w-12 p-1 text-center text-base border-b border-gray-300" id="children-input">{guestsAndRooms.children}</span>
                    <MyButton
                      onClick={() => setGuestsAndRooms(prev => ({ ...prev, children: prev.children + 1 }))}
                      disabled={guestsAndRooms.children === 6} // Assuming 6 is the max limit
                    >
                      <PlusOutlined />
                    </MyButton>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between mb-4">
                  <label htmlFor="rooms-input" className="text-base inline-flex items-center">
                    <img src={room_icon} alt="Room Icon" className="size-5 mr-1" />
                    Số phòng:
                  </label>
                  <div className="flex flex-row items-center">
                    <MyButton
                      onClick={() => setGuestsAndRooms(prev => ({ ...prev, rooms: Math.max(1, prev.rooms - 1) }))}
                      disabled={guestsAndRooms.rooms === 1}
                    >
                      <MinusOutlined />
                    </MyButton>
                    <span className="w-12 p-1 text-center text-base border-b border-gray-300" id="rooms-input">{guestsAndRooms.rooms}</span>
                    <MyButton
                      onClick={() => {
                        if (guestsAndRooms.adults > guestsAndRooms.rooms) {
                          setGuestsAndRooms(prev => ({ ...prev, rooms: prev.rooms + 1 }));
                        } else {
                          setWarningAdultRoom(true);
                          setTimeout(() => {
                            setWarningAdultRoom(false);
                          }, 2000);
                        }
                      }}
                    >
                      <PlusOutlined />
                    </MyButton>
                  </div>
                </div>
                <button
                  className="mt-4 py-1 bg-blue-500 cursor-pointer text-white text-base rounded hover:bg-blue-600"
                  onClick={() => setDropdownVisible(false)}
                >
                  Done
                </button>
              </div>
            )}
          >
            <Tooltip
              open={warningAdultRoom}
              title={<span>Số phòng không thể nhiều hơn số khách người lớn</span>}
              placement="left"
            >
              <Input
                placeholder="Khách và Phòng"
                readOnly
                prefix={<img src={guest_and_room_icon} alt="Guest and Room Icon" className="size-5 mr-1" />}
                value={`${guestsAndRooms.adults} người lớn, ${guestsAndRooms.children} trẻ em, ${guestsAndRooms.rooms} phòng`}
                size="large"
              />
            </Tooltip>
          </Dropdown>
        </Form.Item>

        <Form.Item style={{ display: "flex", alignItems: "end", width: "10%" }} >
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined style={{ fontSize: "20px" }} />}
            size="large"
          >
            Tìm kiếm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SearchBar;