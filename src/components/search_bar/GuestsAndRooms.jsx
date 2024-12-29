import React, { useState, useCallback } from 'react';
import { Button, Input, Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const GuestsAndRoomsContent = ({ guestsAndRooms, increment, decrement, setPopoverVisible }) => (
  <div className='w-80'>
    <div className="flex justify-between items-center mb-2">
      <span className="font-semibold">Người lớn</span>
      <div className="flex items-center space-x-2">
        <Button className='border-none font-semibold text-blue-500 text-xl' onClick={() => decrement('adults', guestsAndRooms.rooms)}>-</Button>
        <span className="font-semibold w-10 text-center">{guestsAndRooms.adults}</span>
        <Button className='border-none font-semibold text-blue-500 text-xl' onClick={() => increment('adults', 30)}>+</Button>
      </div>
    </div>
    <div className="flex justify-between items-center mb-2">
      <span className="font-semibold">Trẻ em</span>
      <div className="flex items-center space-x-2">
        <Button className='border-none font-semibold text-blue-500 text-xl' onClick={() => decrement('children', 0)}>-</Button>
        <span className="font-semibold w-10 text-center">{guestsAndRooms.children}</span>
        <Button className='border-none font-semibold text-blue-500 text-xl' onClick={() => increment('children', 15)}>+</Button>
      </div>
    </div>
    <div className="flex justify-between items-center mb-2">
      <span className="font-semibold">Phòng</span>
      <div className="flex items-center space-x-2">
        <Button className='border-none font-semibold text-blue-500 text-xl' onClick={() => decrement('rooms', 1)}>-</Button>
        <span className="font-semibold w-10 text-center">{guestsAndRooms.rooms}</span>
        <Button className='border-none font-semibold text-blue-500 text-xl' onClick={() => increment('rooms', guestsAndRooms.adults)}>+</Button>
      </div>
    </div>
    <div className="flex justify-end mt-4">
      <Button type='link' className="font-semibold" onClick={() => setPopoverVisible(false)}>Xong</Button>
    </div>
  </div>
);


const GuestsAndRooms = React.memo(({ guestsAndRooms, setGuestsAndRooms }) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [warningPopoverVisible, setWarningPopoverVisible] = useState(false);

  const isRoomCountExceedingAdults = (rooms, adults) => rooms + 1 > adults;

  const increment = useCallback((key, max) => {
    setGuestsAndRooms(prev => {
      if (key === 'rooms' && isRoomCountExceedingAdults(prev.rooms, prev.adults)) {
        setWarningPopoverVisible(true);
        setTimeout(() => setWarningPopoverVisible(false), 3000);
        return prev;
      }
      return { ...prev, [key]: prev[key] < max ? prev[key] + 1 : max };
    });
  }, [setGuestsAndRooms]);

  const decrement = useCallback((key, min) => {
    setGuestsAndRooms(prev => {
      if (key === 'adults' && isRoomCountExceedingAdults(prev.rooms, prev.adults) && prev.adults > 1) {
        setWarningPopoverVisible(true);
        setTimeout(() => setWarningPopoverVisible(false), 3000);
        return prev;
      }
      return { ...prev, [key]: prev[key] > min ? prev[key] - 1 : min };
    });
  }, [setGuestsAndRooms]);

  const handlePopoverVisibleChange = (newVisible) => {
    setPopoverVisible(newVisible);
  };

  return (
    <div className="flex w-full flex-col">
      <label className="text-black text-sm font-semibold ml-1 mb-1">Khách và Phòng</label>
      <Popover
        content={
          <div>
            <GuestsAndRoomsContent guestsAndRooms={guestsAndRooms} increment={increment} decrement={decrement} setPopoverVisible={setPopoverVisible} />
            {warningPopoverVisible && <div className="mt-2 text-red-500">Số phòng không thể vượt quá số khách người lớn</div>}
          </div>
        }
        trigger="click"
        placement="bottom"
        open={popoverVisible}
        onOpenChange={handlePopoverVisibleChange}
      >
        <Input
          placeholder="Khách và Phòng"
          readOnly
          prefix={<UserOutlined style={{ fontSize: '20px', marginRight: '4px', color: '#1677ff' }} />}
          size='large'
          value={`${guestsAndRooms.adults} người lớn, ${guestsAndRooms.children} trẻ em, ${guestsAndRooms.rooms} phòng`}
        />
      </Popover>
    </div>
  );
});

export default GuestsAndRooms;