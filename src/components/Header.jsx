import { Link } from 'react-router-dom';
import { Badge, Avatar, Dropdown } from 'antd';
import { HeartOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import paths from '../const/paths'
import { useSignOutModal } from '../contexts/SignOutModalContext';

const tvlk_header_logo = "https://d1785e74lyxkqq.cloudfront.net/_next/static/v4.6.0/9/97f3e7a54e9c6987283b78e016664776.svg";

const Header = () => {
  const { openSignOutModal } = useSignOutModal();
  const items = [
    {
      key: '1',
      label: <a to={paths.account}>Tài khoản của bạn</a>,
      icon: <UserOutlined />,
    },
    {
      key: '2',
      label: <span>Đăng xuất</span>,
      onClick: openSignOutModal,
      icon: <LogoutOutlined />,
    }
  ];

  const itemCount = 5; // Replace with actual item count from favorites or cart
  // const user = {
  //   email: 'example@example.com',
  //   avatar: null, // Replace with user avatar if available
  // };
  const user = null; // Replace with actual user data from context or state

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex w-full max-w-7xl mx-auto justify-between items-center">
        <Link to={paths.home}>
          <img src={tvlk_header_logo} alt="Traveloka Header Logo" style={{ height: '40px' }} />
        </Link>

        <div className="flex items-center gap-16">
          {user ? (
            <>
              <Link to={paths.favorites}>
                <Badge count={itemCount} overflowCount={99} offset={[10, 0]}>
                  <HeartOutlined style={{ fontSize: '24px' }} />
                </Badge>
              </Link>
              <Dropdown menu={{ items }} trigger={['click']}>
                <Avatar
                  src={"src/assets/react.svg"} // replace with user.avatar if available
                  alt="user avatar"
                  style={{ cursor: 'pointer' }}
                >
                  {!user.avatar && user.email.charAt(0).toUpperCase()}
                  lmao
                </Avatar>
              </Dropdown>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to={paths.partnershipRegister}>
                <span className="hover:text-blue-500 text-sm">
                  Trở thành đối tác của chúng tôi
                </span>
              </Link>
              <Link to={paths.signIn}>
                <div className="border px-4 py-2 rounded hover:text-blue-500 hover:border-blue-500 text-sm">
                  Đăng nhập
                </div>
              </Link>
              <Link to={paths.signUp}>
                <div className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm">
                  Đăng ký
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;