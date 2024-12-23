import React, { useState } from 'react';

import AccountManagement from './AccountManagement';
import UserInformation from './UserInformation';
import { Layout, Menu } from 'antd';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const ProfilePage = () => {
  const [selectedMenu, setSelectedMenu] = useState('userInformation');

  const renderContent = () => {
    switch (selectedMenu) {
      case 'userInformation':
        return <UserInformation />;
      case 'accountManagement':
        return <AccountManagement />;
      default:
        return <UserInformation />;
    }
  };

  return (
    <Layout className="min-h-screen">
      <Header className="bg-gray-800 text-white flex items-center">
        <div className="text-xl font-bold">Profile Management</div>
      </Header>
      <Layout>
        <Sider width={300} className="bg-gray-100">
          <Menu
            mode="inline"
            selectedKeys={[selectedMenu]}
            onClick={({ key }) => setSelectedMenu(key)}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="userInformation" icon={<UserOutlined />} style={{ padding: '16px', fontSize: '16px' }}>
              User Information
            </Menu.Item>
            <Menu.Item key="accountManagement" icon={<SettingOutlined />} style={{ padding: '16px', fontSize: '16px' }}>
              Account Management
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content className="p-6 bg-white">
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ProfilePage;