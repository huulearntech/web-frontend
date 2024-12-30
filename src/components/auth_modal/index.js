import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, notification } from 'antd';

import { useAuth } from "../../context/AuthContext";
import authServices from "../../services/authServices";
import paths from "../../const/paths";

import AuthForm from './AuthForm';
import OtpForm from './OtpForm';


const AuthModal = ({ isOpen, onClose, mode, setMode }) => {
  const { signIn } = useAuth();
  const [isSignUp, setIsSignUp] = useState(mode === 'signUp');
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [email, setEmail] = useState('');

  useEffect(() => {
    setIsSignUp(mode === 'signUp');
  }, [mode]);

  const handleSignIn = async (values) => {
    setLoading(true);
    try {
      console.log('Sign in:', values);
      const response = await signIn(values);
      notification.success({
        message: 'Đăng nhập thành công',
        description: 'Chào mừng bạn trở lại!',
      });
      if (response?.businessErrorCode === 304) {
        notification.error({
          message: 'Đăng nhập thất bại',
          description: 'Nhập sai email hoặc mật khẩu. Vui lòng thử lại.',
        });
      }
    } catch (error) {
      console.error('Đăng nhập thất bại', error);
    } finally {
      setLoading(false);
      onClose();
    }
  };
  const handleSignUp = async (values) => {
    setLoading(true);
    try {
      const { confirmPassword, ...registrationRequest } = values;
      setEmail(registrationRequest.email); // Store the email
      await authServices.register(registrationRequest);
      setIsOtpStep(true);
    } catch (error) {
      console.error('Đăng ký thất bại', error);
      if (error.response && error.response.status === 500 && error.response.data.error.includes('Email already exists')) {
        notification.error({
          message: 'Email đã được đăng ký',
          description: 'Email bạn đã nhập đã được đăng ký. Vui lòng sử dụng email khác hoặc đăng nhập.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtp = async (values) => {
    setLoading(true);
    try {
      await authServices.verifyOtp(email, values.otp); // Use the stored email
      console.log('OTP verified successfully');
      notification.success({
        message: 'Đăng ký thành công',
        description: 'Tài khoản của bạn đã được tạo thành công.',
      });
      setIsOtpStep(false);
      onClose();
    } catch (error) {
      console.error('Error verifying OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className="rounded-lg p-6"
    >
      {isOtpStep ?
        <OtpForm form={form} onSubmit={handleOtp} isLoading={loading}/>
        : isSignUp ?
          <>
            <AuthForm form={form} isSignUp={true} isLoading={loading} onSubmit={handleSignUp} />
            <div className="flex justify-center mt-2">
              <Button
                type="link"
                onClick={() => setMode('signIn')}
                disabled={loading}
              >
                Bạn đã có tài khoản? Đăng nhập ở đây
              </Button>
            </div>
          </>
          : <>
            <AuthForm form={form} isSignUp={false} isLoading={loading} onSubmit={handleSignIn} />
            <div className="flex flex-col items-center space-y-2 mt-2">
              <Button
                type="link"
                onClick={() => setMode('signUp')}
                disabled={loading}
              >
                Bạn chưa có tài khoản? Đăng ký ở đây
              </Button>
              <a href={paths.forgotPassword} className="text-blue-500 hover:underline">
                Bạn quên mật khẩu?
              </a>
            </div>
          </>
      }
    </Modal>
  );
};

export default AuthModal;