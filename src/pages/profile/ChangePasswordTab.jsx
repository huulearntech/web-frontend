import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';

import userServices from '../../services/userServices';

const ChangePasswordTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const handleCancel = () => {
  };

  const handleFinish = async () => {
    setIsLoading(true);

    const oldPassword = form.getFieldValue('oldPassword');
    const newPassword = form.getFieldValue('newPassword');
    try {
      await userServices.changePassword(oldPassword, newPassword);
      form.resetFields(); // Reset all fields after submission
      notification.success({
        message: 'Thành công',
        description: 'Đổi mật khẩu thành công!',
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Có lỗi xảy ra',
        description: 'Đổi mật khẩu không thành công',
      });
    } finally {
      setIsLoading(false);
      handleCancel();
    }
  };

  return (
      <Form form={form} layout="vertical" onFinish={handleFinish} disabled={isLoading}>
        <Form.Item
          label="Mật khẩu "
          name="oldPassword"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
        >
          <Input.Password size='large' />
        </Form.Item>
        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' },
          { min: 8, message: ' khẩu phải có ít nhất 8 ký tự!' }
          ]}
        >
          <Input.Password size='large' />
        </Form.Item>
        <Form.Item
          label="Xác nhận mật khẩu mới"
          name="confirmNewPassword"
          hasFeedback
          rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject('Xác nhận mật khẩu không khớp!');
            },
          }),
          { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!'}
          ]}
        >
          <Input.Password size='large'/>
        </Form.Item>
        <div className='flex justify-center'>
          <Form.Item>
            <Button type="primary" htmlType="submit">Gửi yêu cầu</Button>
          </Form.Item>
        </div>
      </Form>
  );
};

export default ChangePasswordTab;