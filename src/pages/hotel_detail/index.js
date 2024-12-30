import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";

import Overview from "./Overview";
import AvailableRoomList from "./AvailableRoomList";
import Feedbacks from "./Feedbacks";
import SearchBar from "../../components/search_bar";

import PATHS from "../../const/paths";

import withCommonLayout from "../../layouts_hoc/Common";

const HotelDetail = () => {
  // const reactLocation = useLocation();

  const [location, setLocation] = useState('');
  const [checkInOut, setCheckInOut] = useState([]);
  const [guestsAndRooms, setGuestsAndRooms] = useState({ adults: 2, children: 0, rooms: 1 });

  // useEffect(() => {
  //   setIsLoading(true);
  //   const params = new URLSearchParams(reactLocation.hotel);
  //   // const hotelID = parseInt(params.get('hotel'));
  //   const checkIn = dayjs(params.get('checkIn'));
  //   const checkOut = dayjs(params.get('checkOut'));
  //   const adults = parseInt(params.get('adults'));
  //   const children = parseInt(params.get('children'));
  //   const rooms = parseInt(params.get('rooms'));

  //   const isValidDate = (date) => date.isValid ? date.isValid() : false;

  //   const validCheckIn = isValidDate(checkIn) ? checkIn : undefined;
  //   const validCheckOut = isValidDate(checkOut) ? checkOut : undefined;
  //   const validAdults = isNaN(adults) ? 2 : adults;
  //   const validChildren = isNaN(children) ? 0 : children;
  //   const validRooms = isNaN(rooms) ? 1 : rooms;

  //   setHotelID(hotelID);
  //   setCheckInOut([validCheckIn, validCheckOut]);
  //   setGuestsAndRooms({ adults: validAdults, children: validChildren, rooms: validRooms });

  //   async function getResults() {
  //     setIsLoading(true);
  //     try {
  //       const response = await searchServices.searchBySpec_Filter_Sort_Page(
  //         hotelID,
  //         validCheckIn,
  //         validCheckOut,
  //         validAdults,
  //         validChildren,

  //       );
  //       setSearchResults(response.data);
  //       setTotalResults(response.total);
  //     } catch (error) {
  //       console.error("Error occurred during search:", error);
  //       // Handle the error, e.g., show an error message to the user
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   getResults();

  // }, [reactLocation.search, filter, sortBy, currentPage]);

  return (
    <div className="bg-gray-100 w-full min-h-screen flex flex-col items-center justify-center">
      <div className="w-full min-h-screen max-w-7xl flex flex-col items-center justify-center space-y-4">
        <div className="flex items-center justify-center w-full py-2">
          <SearchBar
            location={location}
            checkInOut={checkInOut}
            guestsAndRooms={guestsAndRooms}
            setLocation={setLocation}
            setCheckInOut={setCheckInOut}
            setGuestsAndRooms={setGuestsAndRooms}
            navigateTo={PATHS.hotelDetail}
          />
        </div>
        <Overview hotel={mockHotel} />
        <AvailableRoomList rooms={mockRooms} hotelName={mockHotel.name} />
        <Feedbacks feedbacks={mockFeedbacks} hotelName={mockHotel.name} />
      </div>
    </div>
  );
};

export default withCommonLayout(HotelDetail);


// Mock data
const mockRooms = [
  {
    id: 1,
    name: 'Deluxe Room',
    images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
    area: '30 sqm',
    price: '$100',
    description: 'A deluxe room with all the amenities you need.',
    adults: 2,
    children: 1,
    amenities: ['Free WiFi', 'TV', 'Mini Bar']
  },
  {
    id: 2,
    name: 'Standard Room',
    images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
    area: '20 sqm',
    price: '$80',
    description: 'A standard room with basic amenities.',
    adults: 2,
    children: 0,
    amenities: ['Free WiFi', 'TV']
  }
];

const mockFeedbacks = [
  {
    id: 1,
    author: "John Doe",
    date: "2023-10-01",
    content: "Great experience! Highly recommend this hotel."
  },
  {
    id: 2,
    author: "Jane Smith",
    date: "2023-10-02",
    content: "The service was excellent and the rooms were clean."
  },
  {
    id: 3,
    author: "Alice Johnson",
    date: "2023-10-03",
    content: "Had a wonderful stay. Will come back again!"
  }
];

const mockHotel = {
  name: "Grand Hotel",
  type: "Luxury",
  rating: "5 stars",
  minPrice: "$200",
  address: "123 Main St, City, Country",
  amenities: ["Free WiFi", "Pool", "Spa", "Gym"],
  description: "The Grand Hotel offers luxurious rooms with stunning views, top-notch amenities, and exceptional service. Perfect for both business and leisure travelers."
};
