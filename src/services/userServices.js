import axiosInstance from './axios_instance';

const addFavorite = async (roomId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn("User is not logged in. Please log in to add favorites.");
    return { message: "User is not logged in. Please log in to add favorites." };
  }

  try {
    const response = await axiosInstance.post("/favorite", { roomId });
    return response.data;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error.response?.data || error.message;
  }
}

const removeFavorite = async (roomId) => {
  try {
    const response = await axiosInstance.delete("/favorite", { data: { roomId } });
    return response.data;
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error.response?.data || error.message;
  }
}

const addFeedback = async (userId, roomId, content) => {
  try {
    const response = await axiosInstance.post("/feedback", { userId, roomId, content });
    return response.data;
  } catch (error) {
    console.error("Error adding feedback:", error);
    throw error.response?.data || error.message;
  }
}

const getFavorites = async () => {
  try {
    const response = await axiosInstance.get("/favorites");
    return response.data;
  } catch (error) {
    console.error("Error getting favorites:", error);
    throw error.response?.data || error.message;
  }
}

////////////////////////////////////////

const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/v3/api-docs/users/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error.response?.data || error.message;
  }
};

const changePassword = async (changePasswordRequest) => {
  try {
    const response = await axiosInstance.post('/v3/api-docs/users/change-password', changePasswordRequest);
    return response.data;
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
    return response.data;
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
    return response.data;
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
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error.response?.data || error.message;
  }
};

export default {
  addFavorite,
  removeFavorite,
  addFeedback,
  getFavorites,
  deleteUser,
  changePassword,
  sendVerificationCode,
  verifyCode,
  resetPassword
};