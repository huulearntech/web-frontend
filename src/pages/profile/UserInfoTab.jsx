import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import userServices from '../../services/userServices';
import { useAuth } from '../../context/AuthContext';

const UserInfoTab = () => {
  const { user } = useAuth();

  const [initialFormData, setInitialFormData] = useState({ fullName: '', email: '' });
  
  const [formData, setFormData] = useState(initialFormData);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  
  useEffect(() => {
    if (user) {
      console.log('User:', user);
      const { fullName, email } = user;
      setInitialFormData({ fullName: fullName || '', email: email || '' });
      setFormData(initialFormData);
    } else {
      console.error('User not found!');
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
      setAvatarFile(file);
    }
  };

  const handleSubmit = async () => {
    try {
      await userServices.updateUserData(formData.fullName, avatarFile);
      console.log('User data updated successfully!');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label={<span className="font-semibold">Ảnh đại diện</span>}
        className="text-center">
        <input
          type='file'
          onChange={handleAvatarChange} />
      </Form.Item>
      <Form.Item
        label={<span className="font-semibold">Ảnh đại diện</span>}
        className="text-center">
        <img
          src={avatarUrl}
          alt="Avatar"
          style={{ width: '100px', height: '100px', borderRadius: '50%' }}
        />
      </Form.Item>

      <Form.Item
        label={<span className="font-semibold">Họ tên</span>}
        name="name"
        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
      >
        <Input name="name" value={formData.fullName} onChange={handleInputChange} size='large' />
      </Form.Item>

      <Form.Item
        label={<span className="font-semibold">Email</span>}
        className="text-center">
        <Input value={formData.email} readOnly />
      </Form.Item>

      <Form.Item className="text-center">
        <Button style={{ marginRight: '8px' }} onClick={() => setFormData(initialFormData)}>Hủy</Button>
        <Button type="primary" htmlType="submit">Lưu</Button>
      </Form.Item>
    </Form>
  );
};

export default UserInfoTab;