import React, { useState } from 'react';
import { Input, Button, Form, notification } from 'antd';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import { fake_user } from '../../fake_data';

const UserInformation = () => {
  const [user, setUser] = useState(fake_user);
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setEditing(false);
    notification.success({
      message: 'Cập nhật thông tin thành công!',
      placement: 'bottomRight'
    });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-xl">
        <div className="flex h-16 justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Thông tin cá nhân</h2>
          {!editing && (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setEditing(true)}
              className="flex items-center"
            >
              Sửa
            </Button>
          )}
        </div>
        <Form
          layout="vertical"
          onFinish={handleSave}
          initialValues={user}
          className="space-y-6"
        >
          <Form.Item
            label={<span className="font-semibold">Họ tên</span>}
            name="fullName"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên của bạn!' }]}
          >
            <Input
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              readOnly={!editing}
              size='large'
            />
          </Form.Item>
          <Form.Item
            label={<span className="font-semibold">Số điện thoại</span>}
            name="phone"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn!' }]}
          >
            <Input
              name="phone"
              value={user.phone}
              onChange={handleChange}
              readOnly={!editing}
              size='large'
            />
          </Form.Item>
          <Form.Item
            label={<span className="font-semibold">Email</span>}
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}
          >
            <Input
              name="email"
              value={user.email}
              onChange={handleChange}
              readOnly={!editing}
              size='large'
            />
          </Form.Item>
          {editing && (
            <div className="flex justify-end space-x-4">
              <Button
                type="default"
                onClick={() => setEditing(false)}
                className="flex items-center"
              >
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                icon={<CheckOutlined />}
                className="flex items-center"
              >
                Lưu
              </Button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default UserInformation;