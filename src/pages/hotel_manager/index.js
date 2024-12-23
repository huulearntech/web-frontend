import React, { useState } from 'react';
import RoomManagement from './RoomManagement';
import Statistics from './Statistics';
import AddRoom from './AddRoom';
import { Layout, Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';


const { Header, Sider, Content } = Layout;

const HotelManager = () => {
  const [selectedMenu, setSelectedMenu] = useState('roomManagement');

  const renderContent = () => {
    switch (selectedMenu) {
      case 'roomManagement':
        return <RoomManagement />;
      case 'statistics':
        return <Statistics />;
      // Add more cases here for other details
      case 'addRoom':
        return <AddRoom />;

      default:
        return <RoomManagement />;
    }
  };

  return (
    <Layout className="min-h-screen">
      <Header className="bg-gray-800 text-white flex items-center">
        <div className="text-xl font-bold">Hotel Management System</div>
      </Header>
      <Layout>
        <Sider width={200} className="bg-gray-100">
          <Menu
            mode="inline"
            selectedKeys={[selectedMenu]}
            onClick={({ key }) => setSelectedMenu(key)}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="addRoom" icon={<AppstoreOutlined />}>
              Add Room
            </Menu.Item>
            <Menu.Item key="roomManagement" icon={<AppstoreOutlined />}>
              Room Management
            </Menu.Item>
            <Menu.Item key="statistics" icon={<AppstoreOutlined />}>
              Statistics
            </Menu.Item>

            {/* Add more Menu.Item here for other details */}
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

export default HotelManager;