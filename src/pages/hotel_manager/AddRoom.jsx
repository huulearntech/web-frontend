import React from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import XlsxHandler from './XlsxHandler';

const AddRoom = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      {/* <h2 className="text-2xl font-bold mb-6 text-center">Add New Room</h2>
      <Form
        form={form}
        name="addRoom"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Room Number"
          name="roomNumber"
          rules={[{ required: true, message: 'Please input the room number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Room Type"
          name="roomType"
          rules={[{ required: true, message: 'Please input the room type!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please input the price!' }]}
        >
          <InputNumber
            min={0}
            formatter={value => `$ ${value}`}
            parser={value => value.replace('$', '')}
            className="w-full"
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Add Room
          </Button>
        </Form.Item>
      </Form> */}
      <XlsxHandler />
    </div>
  );
};

export default AddRoom;