import axiosInstance from "./axios_instance";

export const getAvailableHotels = async ( address, checkInDate, checkOutDate, numAdults, numChildren) => {
  try {
    const response = await axiosInstance.get("/hotels",
      {
        params: {
          address,
          checkInDate,
          checkOutDate,
          numAdults,
          numChildren
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels", error);
    return null;
  }
};

export default {
  getAvailableHotels,
};