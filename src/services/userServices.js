import axiosInstance from './axios_instance';

const postFeedback = async (userId, roomId, content) => {
  try {
    const response = await axiosInstance.post("/feedback", { userId, roomId, content });
    return response.data;
  } catch (error) {
    console.error("Error adding feedback:", error);
    throw error.response?.data || error.message;
  }
};

const changePassword = async (oldPassword, newPassword) => {
  try {
    const response = await axiosInstance.put('/v3/api-docs/users/change-password', { oldPassword, newPassword });
    console.log("changePassword response:", response);
  } catch (error) {
    console.error("Error changing password:", error);
    throw error.response?.data || error.message;
  }
};

const sendVerificationCode = async (email) => {
  try {
    const response = await axiosInstance.post('/v3/api-docs/users/send-verify-code', null, {
      params: { email }
    });
    console.log("sendVerificationCode response:", response);
  } catch (error) {
    console.error("Error sending verification code:", error);
    throw error.response?.data || error.message;
  }
};

const verifyCode = async (email, code) => {
  try {
    const response = await axiosInstance.post('/v3/api-docs/users/verify-code', null, {
      params: { email, code }
    });
    console.log("verifyCode response:", response);
  } catch (error) {
    console.error("Error verifying code:", error);
    throw error.response?.data || error.message;
  }
};

const resetPassword = async (email, password) => {
  try {
    const response = await axiosInstance.post('/v3/api-docs/users/reset-password', null, {
      params: { email, password }
    });
    console.log("resetPassword response:", response);
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error.response?.data || error.message;
  }
};

const getUserData = async () => {
  try {
    const response = await axiosInstance.get(`/v3/api-docs/users/get-user-data`);
    return response.data;
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error.response?.data || error.message;
  }
};

const updateUserData = async (fullName, imageFile) => {
  try {
    const response = await axiosInstance.put(`/v3/api-docs/users/update`, {imageFile}, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: { fullName },
    });

    return response;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

const uploadImage = async (imageFile) => {
  try {
    const response = await axiosInstance.post(`/v3/api-docs/images/upload`, {file: imageFile}, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("uploadImage response:", response);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};


export default {
  postFeedback,
  changePassword,
  sendVerificationCode,
  verifyCode,
  resetPassword,
  getUserData,
  updateUserData,
  uploadImage,
};