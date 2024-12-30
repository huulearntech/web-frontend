import axiosInstance from "./axios_instance";

const prefix = "/v3/api-docs/rooms";

const createRoom = async (roomData) => {
  try {
    const response = await axiosInstance.post(`${prefix}/add-room`, roomData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
};

const updateRoom = async (roomId, roomData) => {
  try {
    const response = await axiosInstance.put(`${prefix}/update/${roomId}`, roomData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating room:', error);
    throw error;
  }
};

const deleteRoom = async (roomId) => {
  try {
    const response = await axiosInstance.delete(`${prefix}/delete/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting room:', error);
    throw error;
  }
};

const getAllRooms = async () => {
  try {
    const response = await axiosInstance.get(`${prefix}/all-rooms`);
    return response.data;
  } catch (error) {
    console.error('Error getting all rooms:', error);
    throw error;
  }
};

const getRoomById = async (roomId) => {
  try {
    const response = await axiosInstance.get(`${prefix}/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting room by id:', error);
    throw error;
  }
}

export default {
  createRoom,
  updateRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
};