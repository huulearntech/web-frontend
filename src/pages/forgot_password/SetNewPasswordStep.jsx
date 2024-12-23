import React from 'react';
import { Form, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const SetNewPasswordStep = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    onSubmit(values.newPassword);
  };

  return (
    <div className="relative flex w-full h-full space-x-4 items-center justify-between">
      <div className="flex flex-col w-full h-full items-start justify-center space-y-2">
        <h2 className="text-3xl font-semibold">Đặt mật khẩu mới</h2>
        <p className="text-gray-500">Hãy ghi nhớ mật khẩu của bạn nhé!</p>
      </div>
      <div className="flex flex-col w-full h-full justify-center items-end">
        <Form form={form} onFinish={handleSubmit} layout='vertical' className="w-full">
          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            rules={[{ required: true, message: "Vui lòng điền vào ô này!" }]}
          >
            <Input.Password
              placeholder="New Password"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              size='large'
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng điền vào ô này!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm Password"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              size='large'
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="absolute bottom-0 right-0 rounded-full font-semibold" size='large'>
            Hoàn tất
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SetNewPasswordStep;