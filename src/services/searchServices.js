import axiosInstance from "./axios_instance";

import { fake_locations, fake_hotels } from "../mock_data";

const searchBySpec_Filter_Sort_Page = async (
  location,
  checkInDate,
  checkOutDate,
  adults,
  children,
  rooms,
  filter,
  sortBy,
  currentPage
) => {
  // try {
  //   const response = await axiosInstance.get('/search', {
  //     params: {
  //       location,
  //       checkInDate,
  //       checkOutDate,
  //       adults,
  //       children,
  //       rooms
  //     }
  //   });
  //   return response.data;
  // } catch (error) {
  //   console.error("Error searching:", error);
  //   throw error.response?.data || error.message;
  // }
  return { data: fake_hotels, total: fake_hotels.length };
}

const searchBySearchList = async (searchList) => {
  try {
    const response = await axiosInstance.post('/search', searchList);
    return response.data;
  } catch (error) {
    console.error("Error searching:", error);
    throw error.response?.data || error.message;
  }
};

const searchByMapBounds = async (mapBounds, amount=10) => {
  // try {
  //   const response = await axiosInstance.post('/search', mapBounds);
  //   return response.data;
  // } catch (error) {
  //   console.error("Error searching:", error);
  //   throw error.response?.data || error.message;
  // }
  return fake_hotels;
}

const getLocationsContaining = async (query, amount=5) => {
  // try {
  //   const response = await axiosInstance.get(API_URL + query);
  //   return response.data;
  // } catch (error) {
  //   console.error("Error searching:", error);
  //   throw error.response?.data || error.message;
  // }
  if (!query) {
    console.log('No query');
    return fake_locations.slice(0, amount);
  }
  return fake_locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase())).slice(0, amount);
}

const getFavoriteHotelsAtLocation = async (location) => {
  // try {
  //   const response = await axiosInstance.get('/search', {
  //     params
  //   });
  //   return response.data;
  // } catch (error) {
  //   console.error("Error searching:", error);
  //   throw error.response?.data || error.message;
  // }
  return fake_hotels;
};

export default {
  searchBySpec_Filter_Sort_Page,
  searchBySearchList,
  searchByMapBounds,
  getLocationsContaining,
  getFavoriteHotelsAtLocation
};