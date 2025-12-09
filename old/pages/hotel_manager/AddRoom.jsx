import React, { useState } from 'react';
import { Tabs, Table, Form, Input, Button, InputNumber, Select, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import XlsxHandler from './XlsxHandler';
import roomServices from '../../services/roomServices';
import userServices from '../../services/userServices';

const AddRoom = () => {
  const { TabPane } = Tabs;
  const { Option } = Select;
  const [fileList, setFileList] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const pendingRooms = [
    { key: '1', roomNumber: '101', roomType: 'Single', price: '$100', availability: 'Available' },
    { key: '2', roomNumber: '102', roomType: 'Double', price: '$150', availability: 'Occupied' },
  ];

  const handleUpload = async ({ file }) => {
    try {
      const newImageUrls = await userServices.uploadImage(file);
      setImageUrls((prevUrls) => [...prevUrls, newImageUrls]);
      setFileList((prevList) => [...prevList, file]);
      message.success(`${file.name} uploaded successfully.`);
    } catch (error) {
      message.error(`${file.name} upload failed.`);
    }
  };

  const handleSubmit = async (values) => {
    const roomData = { ...values, imageUrls: imageUrls };
    try {
      await roomServices.createRoom(roomData);
      message.success('Room created successfully');
    } catch (error) {
      message.error('Failed to create room');
    }
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  return (
    <div className="bg-white w-full flex">
      <div className="w-1/4 pr-4">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Import Room by Form" key="1">
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item label="Room Number" name="roomNumber" rules={[{ required: true, message: 'Please input the room number!' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Room Type" name="type" rules={[{ required: true, message: 'Please input the room type!' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input the price!' }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label="Number of Adults" name="numOfAdults" rules={[{ required: true, message: 'Please input the number of adults!' }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label="Number of Children" name="numOfChildren" rules={[{ required: true, message: 'Please input the number of children!' }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label="Amenities" name="amenities" rules={[{ required: true, message: 'Please input the amenities!' }]}>
                <Select mode="tags" style={{ width: '100%' }} placeholder="Enter amenities">
                  <Option value="WiFi">WiFi</Option>
                  <Option value="TV">TV</Option>
                  <Option value="Air Conditioning">Air Conditioning</Option>
                  <Option value="Mini Bar">Mini Bar</Option>
                  {/* Add more options as needed */}
                </Select>
              </Form.Item>
              <Form.Item label="Upload Images">
                <Upload
                  showUploadList={true}
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleChange}
                  customRequest={handleUpload}
                  multiple
                >
                  {fileList.length >= 8 ? null : <div><PlusOutlined /><div style={{ marginTop: 8 }}>Upload</div></div>}
                </Upload>
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