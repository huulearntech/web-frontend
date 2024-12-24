import React from 'react';
import { Tabs, Table, Form, Input, Button } from 'antd';
import XlsxHandler from './XlsxHandler';

const AddRoom = () => {
  const { TabPane } = Tabs;
  
  const pendingRooms = [
    { key: '1', roomNumber: '101', roomType: 'Single', price: '$100', availability: 'Available' },
    { key: '2', roomNumber: '102', roomType: 'Double', price: '$150', availability: 'Occupied' },
  ];

  return (
    <div className="bg-white w-full flex">
      <div className="w-1/4 pr-4">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Import Room by Form" key="1">
            <Form layout="vertical">
              <Form.Item label="Room Number" name="roomNumber">
                <Input />
              </Form.Item>
              <Form.Item label="Room Type" name="roomType">
                <Input />
              </Form.Item>
              <Form.Item label="Price" name="price">
                <Input />
              </Form.Item>
              <Form.Item label="Availability" name="availability">
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Import Room by Excel File" key="2">
            <XlsxHandler />
          </TabPane>
        </Tabs>
      </div>
      <div className="w-3/4 pl-4">
        <Table dataSource={pendingRooms} columns={[
          { title: 'Room Number', dataIndex: 'roomNumber', key: 'roomNumber' },
          { title: 'Room Type', dataIndex: 'roomType', key: 'roomType' },
          { title: 'Price', dataIndex: 'price', key: 'price' },
          { title: 'Availability', dataIndex: 'availability', key: 'availability' },
        ]} />
      </div>
    </div>
  );
};

export default AddRoom;