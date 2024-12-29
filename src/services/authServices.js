import axiosInstance from './axios_instance';

const register = async (registrationRequest) => {
  return await axiosInstance.post('/auth/register', registrationRequest);
};

const verifyOtp = async (email, verificationCode) => {
  return await axiosInstance.post('/auth/verify', {
    email,
    verificationCode
  });
};

const authenticateUser = async (authenticationRequest) => {
  return await axiosInstance.post('/auth/login', authenticationRequest);
};

const resendOtp = async (email) => {
  return await axiosInstance.post('/auth/resend', {
    email
  });
};


export default {
  register,
  verifyOtp,
  authenticateUser,
  resendOtp
};