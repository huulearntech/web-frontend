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

const activateAccount = async (token) => {
  return await axiosInstance.get('/auth/activate-account', {
    params: { token }
  });
};

const getUserData = async () => {
  try {
    const response = await axiosInstance.get('/auth/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

const changePassword = async (oldPassword, newPassword) => {
  return await axiosInstance.post('/auth/change-password', {
    oldPassword,
    newPassword
  });
};

const resetPassword = async (email) => {
  return await axiosInstance.post('/auth/reset-password', {
    email
  });
};

export default {
  register,
  verifyOtp,
  authenticateUser,
  activateAccount,
  getUserData,
  changePassword,
  resetPassword
};