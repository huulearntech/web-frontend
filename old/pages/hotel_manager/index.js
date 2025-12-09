import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { AppstoreOutlined, LineChartOutlined, PlusSquareOutlined, UnorderedListOutlined } from '@ant-design/icons';

import RoomManagement from './RoomManagement';
import Statistics from './Statistics';
import AddRoom from './AddRoom';
import BookingManagement from './BookingManagement';

import withCommonLayout from '../../layouts_hoc/Common';

const { Sider, Content } = Layout;

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

      case 'bookingManagement':
        return <BookingManagement />;

      default:
        return <RoomManagement />;
    }
  };

  return (
    <Layout className="min-h-screen">
      <Layout>
        <Sider width={300}>
          <Menu
            mode="inline"
            selectedKeys={[selectedMenu]}
            onClick={({ key }) => setSelectedMenu(key)}
            style={{ height: '100%', borderRight: 0, paddingTop: '24px' }}
          >
            <Menu.Item key="roomManagement" icon={<AppstoreOutlined style={{fontSize: '20px'}}/>} style={{fontSize: '16px'}}>
              Quản lý phòng
            </Menu.Item>
            <Menu.Item key="addRoom" icon={<PlusSquareOutlined style={{fontSize: '20px'}}/>} style={{fontSize: '16px'}}>
            Tạo phòng
            </Menu.Item>
            <Menu.Item key="bookingManagement" icon={<UnorderedListOutlined style={{fontSize: '20px'}}/>} style={{fontSize: '16px'}}>
              Quản lý đơn đặt phòng
            </Menu.Item>
            <Menu.Item key="statistics" icon={<LineChartOutlined style={{fontSize: '20px'}}/>} style={{fontSize: '16px'}}>
              Thống kê
            </Menu.Item>

            {/* Add more Menu.Item here for other details */}
          </Menu>
        </Sider>
        <Layout>
          <Content className="h-screen p-4 bg-white">
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default withCommonLayout(HotelManager);