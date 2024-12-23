import React from 'react';
import { Form, Input, Button } from 'antd';

const AccountManagement = () => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6">
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
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Change email</h2>
        <Form
          className="space-y-4"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Old Email"
            name="oldEmail"
          >
            <Input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </Form.Item>
          <Form.Item
            label="New Email"
            name="newEmail"
          >
            <Input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </Form.Item>
        </Form>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Delete account</h2>
        <Button type="primary" danger className="px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Delete
        </Button>
        <p className="mt-2 text-sm text-gray-600">Warning: This action cannot be undone</p>
      </div>
    </div>
  );
}

export default AccountManagement;