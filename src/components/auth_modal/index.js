import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'antd';

import { useAuth } from "../../context/AuthContext";
import authServices from "../../services/authServices";
import paths from "../../router/paths";

import AuthForm from './AuthForm';
import OtpForm from './OtpForm';


const AuthModal = ({ isOpen, onClose, mode, setMode }) => {
  const { signIn } = useAuth();
  const [isSignUp, setIsSignUp] = useState(mode === 'signUp');
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setIsSignUp(mode === 'signUp');
  }, [mode]);

  const handleSignIn = async (values) => {
    setLoading(true);
    try {
      await signIn(values);
      console.log('Đăng nhập thành công', response);
    } catch (error) {
      console.error('Đăng nhập thất bại', error);
    } finally {
      setLoading(false);
      form.resetFields();
      onClose();
    }
  }

  const handleSignUp = async (values) => {
    setLoading(true);
    try {
      const { confirmPassword, ...registrationRequest } = values;
      console.log(registrationRequest);
      await authServices.register(registrationRequest);
      setIsOtpStep(true);
      console.log(registrationRequest);
    } catch (error) {
      console.error('Đăng ký thất bại', error);
    } finally {
      setLoading(false);
    }
  }

  const handleOtp = async (values) => {
    setLoading(true);
    try {
      await authServices.verifyOtp(values.email, values.otp);
      console.log(values.email, values.otp);
      console.log('OTP verified successfully');
      setIsOtpStep(false);
      onClose();
    } catch (error) {
      console.error('Error verifying OTP:', error);
    } finally {
      setLoading(false);
      form.resetFields();
    }
  }

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className="rounded-lg p-6"
    >
      {isOtpStep ?
        <OtpForm form={form} onSubmit={handleOtp} />
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