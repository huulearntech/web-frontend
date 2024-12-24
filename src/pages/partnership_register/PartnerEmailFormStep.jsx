import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';

const PartnerEmailFormStep = ({ form, onSubmit, formData }) => {
  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form, formData]);

  const handleEmailSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <div className="flex w-full space-x-4 justify-between">
      <div className="flex flex-col w-full items-start space-y-2">
        <h2 className="text-3xl font-semibold">Đăng ký đối tác</h2>
        <p className="text-gray-500">để mở rộng cơ hội kinh doanh của bạn!</p>
      </div>
      <Form form={form} onFinish={handleEmailSubmit} className='w-full'>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Vui lòng nhập email của bạn!', type: 'email' }]}
        >
          <Input
            placeholder="Email"
            type="email"
            size='large'
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' },
          { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' }
          ]}
        >
          <Input.Password
            placeholder="Mật khẩu"
            size='large'
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu của bạn!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
            { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' }
          ]}
        >
          <Input.Password
            placeholder="Xác nhận mật khẩu"
            size='large'
          />
        </Form.Item>
        <div className="flex w-full justify-end items-end">
          <Button type="primary" htmlType="submit" className="rounded-full font-semibold" size='large'>
          Tiếp theo
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PartnerEmailFormStep;