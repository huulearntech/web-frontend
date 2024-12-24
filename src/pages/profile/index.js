import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import UserInfoTab from './UserInfoTab';
import ChangePasswordTab from './ChangePasswordTab';
import withCommonLayout from '../../layouts_hoc/Common';

const ProfilePage = () => {
  const initialFormData = {
    name: '',
    email: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="flex justify-center items-center h-screen -translate-y-20">
      <div className="w-full max-w-xl h-128 p-5 bg-white border border-gray-300 rounded-lg">
        <Tabs defaultActiveKey="1" size='large'>
          <Tabs.TabPane tab="Thông tin cá nhân" key="1">
            <UserInfoTab
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đổi mật khẩu" key="2">
            <ChangePasswordTab />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default withCommonLayout(ProfilePage);