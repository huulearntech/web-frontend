import React, { useState } from 'react';

import { Divider, Layout, Menu, notification } from 'antd';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';

import AccountManagement from './AccountManagement';
import UserInformation from './UserInformation';

import withCommonLayout from '../../layouts_hoc/Common';

import { fake_user } from '../../fake_data'

const ProfilePage = () => {
  const [selectedMenu, setSelectedMenu] = useState('userInformation');

  const [user, setUser] = useState(fake_user);
  const [editing, setEditing] = useState(false);

  const handleSave = (updatedUser) => {
    setUser(updatedUser);
    setEditing(false);
    notification.success({
      message: 'Cập nhật thông tin thành công!',
    });
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'userInformation':
        return <UserInformation
          user={user}
          setUser={setUser}
          editing={editing}
          setEditing={setEditing}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />;
      case 'accountManagement':
        return <AccountManagement />;
      default:
        return <UserInformation
          user={user}
          setUser={setUser}
          editing={editing}
          setEditing={setEditing}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />;
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Layout className="w-full max-w-7xl min-h-screen">
        <Layout.Header className="bg-gray-800 text-white flex items-center">
          <div className="text-xl font-bold">Profile Management</div>
        </Layout.Header>
        <Layout>
          <Layout.Sider width={300}>
            <Menu
              mode="inline"
              selectedKeys={[selectedMenu]}
              onClick={({ key }) => setSelectedMenu(key)}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="userInformation" icon={<UserOutlined style={{ fontSize: '20px' }} />} style={{ fontSize: '16px', fontWeight: 600 }}>
                User Information
              </Menu.Item>
              <Menu.Item key="accountManagement" icon={<SettingOutlined style={{ fontSize: '20px' }} />} style={{ fontSize: '16px', fontWeight: 600 }}>
                Account Management
              </Menu.Item>
            </Menu>
          </Layout.Sider>
          <Divider type="vertical" style={{ height: '100%' }} />
          <Layout>
            <Layout.Content className="bg-white">
              {renderContent()}
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default ProfilePage;