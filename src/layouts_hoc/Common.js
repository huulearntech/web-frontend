import React, { useState, useEffect } from 'react';
import AuthModal from '../components/auth_modal';
import Footer from '../components/Footer';
import Header from '../components/header';
import { FloatButton } from 'antd';

const withCommonLayout = (WrappedComponent) => {
  return (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('signIn');
    const openModal = (mode) => {
      setAuthMode(mode);
      setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsHeaderVisible(false);
        } else {
          setIsHeaderVisible(true);
        }
        setLastScrollY(currentScrollY);
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [lastScrollY]);

    return (
      <div className="layout-root bg-gray-100">
        <Header onOpenAuthModal={openModal} isHeaderVisible={isHeaderVisible}/>
        <FloatButton.BackTop />
        <AuthModal isOpen={isModalOpen} onClose={closeModal} mode={authMode} setMode={setAuthMode} />
        <main className='pt-20 w-full min-h-screen'>
          <WrappedComponent {...props} />
        </main>
        <Footer className='mt-10'/>
      </div>
    );
  };
};

export default withCommonLayout;