import React from 'react';
import { Form, Input, Button } from 'antd';

const PartnerEmailFormStep = ({ form, onSubmit }) => {
  // const [form] = Form.useForm();

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <Form form={form} onFinish={handleSubmit} className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Partnership Register</h2>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input the email!', type: 'email' }]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input the password!' }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: 'Please confirm the password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords do not match!'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PartnerEmailFormStep;