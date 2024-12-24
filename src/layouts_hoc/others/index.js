import React, { useState } from 'react';
import AuthModal from '../../components/auth_modal';
import Footer from '../../components/Footer';
import Header from '../../components/header';

import { FloatButton } from 'antd';

const OtherLayout = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signIn');
  const openModal = (mode) => {
    setAuthMode(mode);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="layout-root bg-gray-100">
      <Header onOpenAuthModal={openModal} isHeaderVisible={true}/>
      <FloatButton.BackTop />
      <AuthModal isOpen={isModalOpen} closeModal={closeModal} mode={authMode} />
      <main className='pt-20 w-full min-h-screen'>
        {children}
      </main>
      <Footer className='mt-10'/>
    </div>
  );
};

export default OtherLayout;
