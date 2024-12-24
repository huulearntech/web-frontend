import React, { useState, useEffect } from 'react';
import { Input, Button, Form, notification } from 'antd';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';

const UserInformation = ({ user, setUser, editing, setEditing, handleSave, handleCancel }) => {
  const [form] = Form.useForm();
  const [localUser, setLocalUser] = useState(user);

  useEffect(() => {
    setLocalUser(user);
    form.setFieldsValue(user);
  }, [user, form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalUser((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = () => {
    handleSave(localUser);
  };

  const onCancel = () => {
    setLocalUser(user);
    form.resetFields();
    handleCancel();
  };

  return (
    <div className="flex justify-center p-6">
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
          form={form}
          onFinish={onSave}
          initialValues={localUser}
          className="space-y-6"
        >
          <Form.Item
            label={<span className="font-semibold">Họ tên</span>}
            name="fullName"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên của bạn!' }]}
          >
            <Input
              name="fullName"
              value={localUser.fullName}
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
              value={localUser.phone}
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
              value={localUser.email}
              onChange={handleChange}
              readOnly={!editing}
              size='large'
            />
          </Form.Item>
          {editing && (
            <div className="flex justify-end space-x-4">
              <Button
                type="default"
                onClick={onCancel}
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