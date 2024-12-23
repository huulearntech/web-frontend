import React from 'react';
import { Form, Input, Button } from 'antd';

const EmailStep = ({ onSubmit, email, setEmail }) => {
  const handleEmailSubmit = (values) => {
    onSubmit(values.email);
  };

  return (
    <div className="flex w-full space-x-4 justify-between">
      <div className="flex flex-col w-full items-start space-y-2">
        <h2 className="text-3xl font-semibold">Đặt lại mật khẩu</h2>
        <p className="text-gray-500">Nhập email mà bạn đã sử dụng để đăng ký tài khoản</p>
      </div>
      <Form onFinish={handleEmailSubmit} className='w-full'>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}
        >
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size='large'
          />
        </Form.Item>
        <div className="flex w-full h-full justify-end items-end">
          <Button type="primary" htmlType="submit" className="rounded-full font-semibold" size='large'>
            Tiếp theo
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EmailStep;