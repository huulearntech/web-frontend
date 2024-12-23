import React from 'react';
import { DatePicker } from 'antd';
import 'moment/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
import moment from 'moment';
import { CalendarOutlined } from '@ant-design/icons';


const InoutDate = React.memo(({ checkInOut, setCheckInOut }) => {
  const disabledDate = (current) => {
    return current && current < moment().startOf('day');
  };

  return (
    <div className="flex w-full flex-col">
      <label className="text-black text-sm font-semibold ml-1 mb-1">Ngày nhận phòng và trả phòng</label>
        <DatePicker.RangePicker
          placeholder={['Ngày nhận', 'Ngày trả']}
          prefix={<CalendarOutlined style={{ fontSize: '20px', marginRight: '4px', color: '#1677ff' }} />}
          suffixIcon={null}
          size='large'
          disabledDate={disabledDate}
          format={'DD/MM/YYYY'}
          value={checkInOut}
          onChange={(dates) => setCheckInOut(dates)}
          locale={locale}
        />
    </div>
  );
});

export default InoutDate;