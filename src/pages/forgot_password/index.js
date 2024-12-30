import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification, Steps } from 'antd';

import EmailStep from './EmailStep';
import OtpStep from './OtpStep';
import SetNewPasswordStep from './SetNewPasswordStep';

import paths from '../../const/paths';
import userServices from '../../services/userServices'; // Import user services
import { set } from 'lodash';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleEmailSubmit = async (email) => {
    setIsLoading(true);
    try {
      await userServices.sendVerificationCode(email); // Use sendVerificationCode service
      setEmail(email);
      setStep(2);
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (otp) => {
    setIsLoading(true);
    try {
      await userServices.verifyCode(email, otp); // Use verifyCode service
      setStep(3);
    } catch (error) {
      console.error('Error verifying OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (newPassword) => {
    setIsLoading(true);
    try {
      await userServices.resetPassword(email, newPassword); // Use resetPassword service
      notification.success({
        message: 'Đặt lại mật khẩu thành công!',
        description: 'Bây giờ bạn có thể đăng nhập với mật khẩu mới.',
        showProgress: true,
        pauseOnHover: false,
        duration: 3,
      });
      navigate(paths.home);
    } catch (error) {
      console.error('Error resetting password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return <EmailStep onSubmit={handleEmailSubmit} email={email} setEmail={setEmail} isLoading={isLoading}/>;
      case 2:
        return <OtpStep onSubmit={handleOtpSubmit}  isLoading={isLoading}/>;
      case 3:
        return <SetNewPasswordStep onSubmit={handlePasswordReset}  isLoading={isLoading}/>;
      default:
        return <EmailStep onSubmit={handleEmailSubmit} email={email} setEmail={setEmail}  isLoading={isLoading}/>;
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-100">

      <div className="relative flex w-full max-w-4xl h-80 items-center justify-center -translate-y-20 bg-white rounded-lg p-8 shadow-lg">
        <div className="absolute -top-20 w-full max-w-xl">
          <Steps current={step - 1} responsive={false}>
            <Steps.Step title="Email" />
            <Steps.Step title="OTP" />
            <Steps.Step title="Đặt mật khẩu mới" />
          </Steps>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default ForgotPassword;