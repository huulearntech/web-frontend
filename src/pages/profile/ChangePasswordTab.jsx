import React, { useState } from 'react';
import { Form, Input, Button, Modal } from 'antd';

import userServices from '../../services/userServices';
import { useAuth } from '../../context/AuthContext';

const ChangePasswordTab = () => {
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = async () => {
    setIsLoading(true);
    const oldPassword = form.getFieldValue('oldPassword');
    const newPassword = form.getFieldValue('newPassword');
    try {
      await userServices.changePassword(oldPassword, newPassword);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields(['otp']); // Reset OTP field when modal is closed
  };

  const handleFinish = async () => {
    setIsLoading(true);

    try {
      // Thang nay dang nhap roi thi can token thoi ko can email
      await userServices.verifyCode(user.email, form.getFieldValue('otp'));
      setIsModalOpen(false);
      form.resetFields(); // Reset all fields after submission
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      handleCancel();
    }
  };

  return (
    <>
      <Form form={form} layout="vertical" onFinish={showModal} disabled={isLoading}>
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

      <Modal
        title="Xác thực OTP"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish} disabled={isLoading}>
          <p>Vui lòng nhập mã OTP đã được gửi đến email của bạn</p>
          <div className='flex justify-center mt-4'>
            <Form.Item name="otp">
              <Input.OTP
              placeholder="OTP"
              length={6}
              formatter={(value) => value.replace(/\D/g, '')}
              autoFocus
              className="w-full p-3 border border-gray-300 rounded"
              inputMode='numeric'
              size='large'
               />
            </Form.Item>
          </div>
          <div className='flex justify-center mt-2'>
            <Form.Item>
              <Button type="primary" htmlType="submit">Xác nhận</Button>
            </Form.Item>
          </div>
          {/* <div className='flex justify-center'>
            <Button type="link" >Gửi lại mã OTP</Button>
          </div> */}
        </Form>
      </Modal>
    </>
  );
};

export default ChangePasswordTab;