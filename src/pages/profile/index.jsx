import React from 'react';
import { Tabs } from 'antd';
import UserInfoTab from './UserInfoTab';
import ChangePasswordTab from './ChangePasswordTab';

const ProfilePage = () => {
  return (
    <Tabs defaultActiveKey="1" size='large'>
      <Tabs.TabPane tab="Thông tin cá nhân" key="1">
        <UserInfoTab />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Đổi mật khẩu" key="2">
        <ChangePasswordTab />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default ProfilePage;