import React, { useState, useEffect, useCallback } from 'react';
import { AutoComplete, Input } from 'antd';
import { CloseCircleFilled, EnvironmentOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import searchServices from '../../services/searchServices';

const Location = React.memo(({ location, setLocation }) => {
  const [options, setOptions] = useState([]);

  const fetchOptions = useCallback(
    debounce(async (location) => {
      if (true) {
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
          console.error('Error fetching location options:', error);
        }
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchOptions(location);
    return () => {
      fetchOptions.cancel();
    };
  }, [location, fetchOptions]);

  return (
    <div className="flex w-full flex-col">
      <label className="text-black text-sm font-semibold ml-1 mb-1">Thành phố, địa điểm, khách sạn:</label>
      <AutoComplete
        options={options}
        allowClear={{ clearIcon: <CloseCircleFilled style={{ fontSize: '14px' }} /> }}
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'default',
        }}
        size='large'
        onChange={setLocation}
        value={location}
      >
        <Input
          prefix={<EnvironmentOutlined style={{ fontSize: '20px', marginRight: '4px', color: '#1677ff' }} />}
          style={{
            width: '100%',
            height: '100%',
            fontSize: '16px',
          }}
          size='large'
          placeholder='Nơi bạn muốn đến'
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
      </AutoComplete>
    </div>
  );
});

export default Location;