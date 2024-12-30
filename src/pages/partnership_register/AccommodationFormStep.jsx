import React, { useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';

const AccommodationFormStep = ({ form, onSubmit, onBack, formData }) => {
  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form, formData]);

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <Form form={form} onFinish={handleSubmit} className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Accommodation Info</h2>
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Please input the accommodation name!' }]}
      >
        <Input placeholder="Accommodation Name" />
      </Form.Item>
      <Form.Item
        name="province"
        rules={[{ required: true, message: 'Please input the accommodation province!' }]}
      >
        <Input placeholder="Accommodation Province" />
      </Form.Item>

      <Form.Item
        name="district"
        rules={[{ required: true, message: 'Please input the accommodation district!' }]}
      >
        <Input placeholder="Accommodation District" />
      </Form.Item>

      <Form.Item
        name="ward"
        rules={[{ required: true, message: 'Please input the accommodation ward!' }]}
      >
        <Input placeholder="Accommodation Ward" />
      </Form.Item>
      

      <Form.Item
        name="longitude"
        rules={[{ required: true, message: 'Please input the longitude!' }]}
      >
        <Input placeholder="Longitude" />
      </Form.Item>
      <Form.Item
        name="latitude"
        rules={[{ required: true, message: 'Please input the latitude!' }]}
      >
        <Input placeholder="Latitude" />
      </Form.Item>
      <Form.Item
        name="type"
        rules={[{ required: true, message: 'Please select the accommodation type!' }]}
      >
        <Select placeholder="Select Accommodation Type">
          <Select.Option value="hotel">Hotel</Select.Option>
          <Select.Option value="villa">Villa</Select.Option>
          <Select.Option value="hostel">Hostel</Select.Option>
          {/* Add more options as needed */}
        </Select>
      </Form.Item>
      <Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Button type="default" className="w-full" onClick={onBack}>
              Previous
            </Button>
          </Col>
          <Col span={12}>
            <Button type="primary" htmlType="submit" className="w-full">
              Submit
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AccommodationFormStep;