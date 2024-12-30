import React from 'react';
import { Form, Input, Button } from 'antd';

const OtpStep = ({ onSubmit, isLoading }) => {
  const handleOtpSubmit = (values) => {
    onSubmit(values.otp);
  };

  return (
    <div className="relative flex w-full h-full space-x-4 items-center justify-between">
      <div className="flex flex-col w-full h-full items-start justify-center space-y-2">
        <h2 className="text-3xl font-semibold">Nhập mã xác thực</h2>
        <p className="text-gray-500">Chúng tôi đã gửi một mã OTP về email của bạn</p>
      </div>
      <div className="flex flex-col w-full h-full justify-center items-end">
        <Form onFinish={handleOtpSubmit} layout='vertical' className="flex w-full justify-end" disabled={isLoading}>
          <Form.Item
            name="otp"
            rules={[{ required: true, message: 'Please input the OTP!' }]}
          >
            <Input.OTP
              placeholder="OTP"
              maxLength={6}
              formatter={(value) => value.replace(/\D/g, '')}
              autoFocus
              className="w-full p-3 border border-gray-300 rounded"
              inputMode='numeric'
              size='large'
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="absolute bottom-0 right-0 rounded-full font-semibold" size='large'>
            Tiếp theo
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default OtpStep;