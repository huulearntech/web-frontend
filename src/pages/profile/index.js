import React from 'react';
import { Tabs } from 'antd';
import UserInfoTab from './UserInfoTab';
import ChangePasswordTab from './ChangePasswordTab';
import withCommonLayout from '../../layouts_hoc/Common';

const ProfilePage = () => {
  return (
    <div className="flex w-full h-screen justify-center mt-20">
      <div className="w-full h-fit max-w-xl p-5 bg-white border border-gray-300 rounded-lg">
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