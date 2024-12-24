import React from 'react';
import { Form, Input, Button, Divider, Modal } from 'antd';

const ChangePasswordModal = ({ isOpen, onOpen, onSubmit }) => {
  return (
    <Modal
      title="Change password"
      open={isOpen}
      footer={null}
    >
      <Form
        className="space-y-4"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="Old Password"
          name="oldPassword"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPassword"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Button type="primary">Save</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}



const AccountManagement = () => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Change password</h2>
          <Form
            className="space-y-4"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item
              label="Old Password"
              name="oldPassword"
            >
              <Input.Password className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="newPassword"
            >
              <Input.Password className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </Form.Item>
          </Form>
      </div>
      <Divider />
      <div className="relative w-full h-40 rounded-lg bg-white p-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Delete account</h2>
          <p className="mt-2 text-sm text-gray-600">Warning: This action cannot be undone</p>

        </div>
        <Button
          type="primary"
          danger
          className="absolute bottom-4 right-4 px-4 py-2 rounded-md shadow-sm">
          Delete
        </Button>
      </div>
      <Divider />
    </div>
  );
}

export default AccountManagement;