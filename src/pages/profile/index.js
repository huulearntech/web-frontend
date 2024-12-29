import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import UserInfoTab from './UserInfoTab';
import ChangePasswordTab from './ChangePasswordTab';
import withCommonLayout from '../../layouts_hoc/Common';

const ProfilePage = () => {
  return (
    <div className="flex justify-center items-center h-screen -translate-y-20">
      <div className="w-full max-w-xl h-128 p-5 bg-white border border-gray-300 rounded-lg">
        <Tabs defaultActiveKey="1" size='large'>
          <Tabs.TabPane tab="Thông tin cá nhân" key="1">
            <UserInfoTab />
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