import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import userServices from '../../services/userServices';
import { useAuth } from '../../context/AuthContext';
import { UserOutlined } from '@ant-design/icons';

const UserInfoTab = () => {
  const { user, fetchUserData } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      console.log('User object in UserInfoTab:', user); // Debugging statement
      const { fullName, email, imageUrl } = user;
      form.setFieldsValue({ fullName, email, imageUrl });
    } else {
      console.error('User not found!');
    }
  }, [user, form]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      form.setFieldsValue({ imageUrl });
      setAvatarFile(file);
    }
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      await userServices.updateUserData(values.fullName, avatarFile);
      notification.success({
        message: 'Cập nhật thông tin thành công',
        description: 'Thông tin của bạn đã được cập nhật thành công!',
      });
      await fetchUserData(); // Fetch user data again after update
    } catch (error) {
      console.error('Error updating user data:', error);
      notification.error({
        message: 'Cập nhật thông tin thất bại',
        description: 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
      });
      form.resetFields();
    } finally {
      setIsEditing(false);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsEditing(false);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{ email: user?.email, fullName: user?.fullName, imageUrl: user?.imageUrl }}
      disabled={isLoading}
    >
      <div className='flex justify-end items-center'>
        {!isEditing && <Button onClick={() => setIsEditing(true)}>Chỉnh sửa</Button>}
      </div>
      <Form.Item
        label={<span className="font-semibold">Ảnh đại diện</span>}
      >
        <div className="flex items-center justify-between">
          {form.getFieldValue('imageUrl') ? (
            <img
              src={form.getFieldValue('imageUrl')}
              alt="Avatar"
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
          ) : (
            <UserOutlined style={{ fontSize: '50px' }} />
          )}
          {isEditing &&
            <input
              type='file'
              onChange={handleAvatarChange}
              hidden={!isEditing}
            />
          }
        </div>
      </Form.Item>

      <Form.Item
        label={<span className="font-semibold">Họ tên</span>}
        name="fullName"
        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
      >
        <Input size='large' readOnly={!isEditing} />
      </Form.Item>

      <Form.Item
        label={<span className="font-semibold">Email</span>}
        name="email"
        className="text-center"
      >
        <Input readOnly size='large' />
      </Form.Item>

      {isEditing &&
        <Form.Item className="text-center">
          <Button style={{ marginRight: '8px' }} onClick={handleCancel}>Hủy</Button>
          <Button type="primary" htmlType="submit">Lưu</Button>
        </Form.Item>
      }
    </Form>
  );
};

export default UserInfoTab;