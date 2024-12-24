import React, { useState } from 'react';
import { Form, Input, Button, Upload, Avatar, message } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';

const UserInfoTab = ({ formData, onInputChange, onSubmit, onCancel }) => {
  const [editing, setEditing] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState(formData.avatar);

  const handleAvatarChange = (info) => {
    if (info.file.status === 'done') {
      // Get the URL of the uploaded file
      const url = URL.createObjectURL(info.file.originFileObj);
      setAvatarUrl(url);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <Form layout="vertical" onFinish={onSubmit} readOnly={!editing}>
      <Form.Item
        label={<span className="font-semibold">Ảnh đại diện</span>}
        className="text-center">
        <Upload
          name="avatar"
          listType="picture-card"
          showUploadList={false}
          beforeUpload={() => false} // Prevent automatic upload
          onChange={handleAvatarChange}
        >
          {avatarUrl ? (
            <Avatar size={64} src={avatarUrl} />
          ) : (
            <Avatar size={64} icon={<UserOutlined />} />
          )}
        </Upload>
      </Form.Item>
      <Form.Item
        label={<span className="font-semibold">Họ tên</span>}
        name="name"
        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
      >
        <Input name="name" value={formData.name} onChange={onInputChange} size='large' />
      </Form.Item>
      <Form.Item
        label={<span className="font-semibold">Email</span>}
        name="email"
      >
        <Input name="email" value={formData.email} onChange={onInputChange} size='large' readOnly/>
      </Form.Item>
      <Form.Item className="text-center">
        <Button style={{ marginRight: '8px' }} onClick={onCancel}>Hủy</Button>
        <Button type="primary" htmlType="submit">Lưu</Button>
      </Form.Item>
    </Form>
  );
};

export default UserInfoTab;