import { useState, useEffect, useCallback } from "react";

import { Button, Input, Popover, DatePicker, AutoComplete, Dropdown, Form } from "antd";
import { UserOutlined, SearchOutlined, CalendarOutlined, CloseCircleFilled, EnvironmentOutlined } from "@ant-design/icons";
import { useSearchBar } from "../contexts/SearchBarContext";
import searchServices from "../services/searchServices";


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

  return (
    <div className="flex flex-col p-4 bg-white rounded-lg shadow-md">
      <Form
        onFinish={handleSubmit}
        layout="inline"
      >
        <Form.Item
          name="location"
          label="Địa điểm"
          layout="vertical"
        >
          <AutoComplete
            options={options}
            allowClear={{ clearIcon: <CloseCircleFilled /> }}
            onChange={setLocation}
            value={location}
          >
            <Input
              required={false}
              prefix={<EnvironmentOutlined style={{ marginRight: "4px", color: "#1677ff" }} />}
              placeholder="Nơi bạn muốn đến"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </AutoComplete>
        </Form.Item>
        <Form.Item
          name="checkInOut"
          label="Ngày"
          layout="vertical"
        >
          <DatePicker.RangePicker
            placeholder={["Ngày nhận", "Ngày trả"]}
            prefix={<CalendarOutlined style={{ marginRight: "4px", color: "#1677ff" }} />}
            suffixIcon={null}
            format={"DD/MM/YYYY"}
            value={checkInOut}
            onChange={(dates) => setCheckInOut(dates)}
          />
        </Form.Item>
        <Form.Item
          name="guestsAndRooms"
          label="Khách và Phòng"
          layout="vertical"
        >
          <Dropdown
            trigger={["click"]}
            open={dropdownVisible}
            onOpenChange={setDropdownVisible}
            popupRender={_ => (
              <div className="flex flex-col p-4 bg-white rounded-lg shadow-xl">
                <div className="flex flex-row items-center justify-between mb-4">
                  <label htmlFor="adults-input">Người lớn:</label>
                  <div className="flex flex-row items-center">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
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
                    >
                      -
                    </button>
                    <span className="w-4 m-2 text-center" id="adults-input">{guestsAndRooms.adults}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => setGuestsAndRooms(prev => ({ ...prev, adults: prev.adults + 1 }))}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between mb-4">
                  <label htmlFor="children-input">Trẻ em:</label>
                  <div className="flex flex-row items-center">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => setGuestsAndRooms(prev =>
                        ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                    >
                      -
                    </button>
                  <span className="w-4 m-2 text-center" id="children-input">{guestsAndRooms.children}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => setGuestsAndRooms(prev => ({ ...prev, children: prev.children + 1 }))}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between mb-4">
                  <label htmlFor="rooms-input">Số phòng:</label>
                  <div className="flex flex-row items-center">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => setGuestsAndRooms(prev => ({ ...prev, rooms: Math.max(1, prev.rooms - 1) }))}
                    >
                      -
                    </button>
                  <span className="w-4 m-2 text-center" id="rooms-input">{guestsAndRooms.rooms}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => {
                        if (guestsAndRooms.adults > guestsAndRooms.rooms) {
                          setGuestsAndRooms(prev => ({ ...prev, rooms: prev.rooms + 1 }));
                        } else {
                            setWarningAdultRoom(true);
                            setTimeout(() => {
                            setWarningAdultRoom(false);
                            }, 2000);
                      }}}
                    >
                      +
                    </button>
                    </div>
                </div>
                <button
                  className="mt-4 bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
                  onClick={() => setDropdownVisible(false)}
                >
                  Done
                </button>
              </div>
            )}
          >
            <Popover
              open={warningAdultRoom}
              content={
                <div>Số phòng không thể nhiều hơn số khách người lớn</div>
              }
              placement="right"
            >
              <Input
                placeholder="Khách và Phòng"
                readOnly
                prefix={<UserOutlined style={{ marginRight: "4px", color: "#1677ff" }} />}
                value={`${guestsAndRooms.adults} người lớn, ${guestsAndRooms.children} trẻ em, ${guestsAndRooms.rooms} phòng`}
              />
            </Popover>
          </Dropdown>
        </Form.Item>

        <Form.Item style={{ display: "flex", alignItems: "end"}} >
          <Button type="primary" htmlType="submit">
            <span>Tìm kiếm</span>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SearchBar;