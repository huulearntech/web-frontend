import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Menu, Badge, Avatar, Dropdown } from 'antd';
import { ShoppingCartOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { ReactComponent as HeaderLogo } from '../../assets/icons/logo_header.svg';
import SignOutModal from './SignOutModal'
import paths from '../../const/paths'


const CartButton = ({ itemCount }) => (
  <Link to="/cart" className="relative inline-block p-2 rounded-full hover:bg-gray-200 cursor-pointer">
    <Badge count={itemCount} overflowCount={99} offset={[10, 0]}>
      <ShoppingCartOutlined className="text-xl" />
    </Badge>
  </Link>
);


const AvatarButton = ({ user, onOpenSignOutModal }) => {
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <UserOutlined className='mr-2' />
        <Link to="/account" className="text-lg">Tài khoản của bạn</Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={onOpenSignOutModal} className="border-t border-gray-200">
        <LogoutOutlined className='mr-2 text-red-500' />
        <span className='text-red-500 text-lg'>Đăng xuất</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Avatar
        src={user.avatar}
        alt="User Avatar"
        className="cursor-pointer"
        style={{ backgroundColor: '#87d068' }}
      >
        {!user.avatar && user.email.charAt(0).toUpperCase()}
      </Avatar>
    </Dropdown>
  );
};


const Header = ({ onOpenAuthModal, isHeaderVisible }) => {
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <>
      <header className={`fixed flex justify-center w-full h-20 z-50 shadow-sm bg-white transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex w-full max-w-7xl h-full justify-between items-center">
          <Link to="/">
            <HeaderLogo className="h-10" />
          </Link>

          {/* <div className="hidden lg:flex space-x-6">
            <Link to={paths.home} className="hover:bg-gray-200 px-4 py-2 text-lg rounded-full hover:underline">Home</Link>
            <Link to={paths.search} className="hover:bg-gray-200 px-4 py-2 text-lg rounded-full hover:underline">Explore</Link>
          </div> */}

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                {/* <CartButton itemCount={1009} /> */}
                <AvatarButton user={user} onOpenSignOutModal={() => setIsSignOutModalOpen(true)} />
              </>
            ) : (
              <>
                <Link to={paths.partnershipRegister} className="flex items-center justify-center hover:text-blue-500 hover:underline">Trở thành đối tác của chúng tôi</Link>
                <Button
                  onClick={() => onOpenAuthModal('signIn')}
                  className="bg-blue-500 text-white font-semibold hover:bg-blue-600"
                >
                  Đăng nhập
                </Button>
                <Button
                  onClick={() => onOpenAuthModal('signUp')}
                  className="border border-black font-semibold hover:bg-gray-200"
                >
                  Đăng ký
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      <SignOutModal
        isOpen={isSignOutModalOpen}
        onClose={() => setIsSignOutModalOpen(false)}
        onConfirm={() => {
          setIsSignOutModalOpen(false);
          signOut();
          console.log('logged out');
        }} />
    </>
  );
};

export default Header;