import hanoiImage from './assets/images/hanoi.webp';
import hoianImage from './assets/images/hoian.jpg';
import dalatImage from './assets/images/dalat.jpg';
import saigonImage from './assets/images/saigon.jpg';
import danangImage from './assets/images/danang.webp';

export const images = {
  hanoi: hanoiImage,
  hoian: hoianImage,
  dalat: dalatImage,
  saigon: saigonImage,
  danang: danangImage,
}

export const slides = [
    {
      id: 1,
      name: 'Ha Noi',
      image: hanoiImage,
      link: '/products/hanoi'
    },
    {
      id: 2,
      name: 'Hoi An',
      image: hoianImage,
      link: '/products/hanoi'
    },
    {
      id: 3,
      name: 'Da Lat',
      image: dalatImage,
      link: '/products/hanoi'
    },
    {
      id: 4,
      name: 'Sai Gon',
      image: saigonImage,
      link: '/products/hanoi'
    },
    {
      id: 5,
      name: 'Da Nang',
      image: danangImage,
      link: '/products/hanoi'
    },
    // Add more products as needed
];



export const fake_hotels = [
  {
    id: 1,
    name: "Dummy hotel",
    imageSrcs: [
      "https://placehold.co/400x300?text=Main+Image",
      "https://placehold.co/100x75?text=Image+1",
      "https://placehold.co/100x75?text=Image+2",
      "https://placehold.co/100x75?text=Image+3"
    ],
    rating: 2.7,
    numberOfReviews: 100,
    type: "Hotel",
    location: "New York, USA",
    description: "This hotel is not good",
    amenities: ["Wifi", "Parking", "Pool"],
    price: 129.99,
    position: [51.505, -0.09]
  },
  {
    id: 2,
    name: "Another dummy hotel",
    imageSrcs: [
      "https://placehold.co/400x300?text=Main+Image",
      "https://placehold.co/100x75?text=Image+1",
      "https://placehold.co/100x75?text=Image+2",
      "https://placehold.co/100x75?text=Image+3"
    ],
    rating: 2.8,
    numberOfReviews: 100,
    type: "Resort",
    location: "California, USA",
    description: "Bla bla bla",
    amenities: ["Wifi", "Parking", "Pool", "Gym", "Spa"],
    price: 129.99,
    position: [51.515, -0.1]
  },
  {
    id: 3,
    name: "This is a very long name to test the overflow of the text",
    imageSrcs: [
      "https://placehold.co/400x300?text=Main+Image",
      "https://placehold.co/100x75?text=Image+1",
      "https://placehold.co/100x75?text=Image+2",
      "https://placehold.co/100x75?text=Image+3"
    ],
    rating: 4.9,
    numberOfReviews: 100,
    type: "Apartment",
    location: "London, UK",
    description: "This hotel is good",
    amenities: ["Wifi", "Parking", "Pool", "Bar", "Restaurant"],
    price: 129.99,
    position: [51.525, -0.11]
  },
];

export const fake_user = {
  fullName: "Nguyen Van Muoi",
  email: "muoi.nguyenvan@gmail.com",
  phone: "0987654321",
  address: "123 Nguyen Van Linh, Da Nang",
};

export const fake_locations = [
  {
    name: "Hà Nội",
  },
  {
    name: "Hồ Chí Minh",
  },
  {
    name: "Đà Nẵng",
  },
  {
    name: "Hải Phòng",
  },
  {
    name: "Cần Thơ",
  },
  {
    name: "Vũng Tàu",
  },
  {
    name: "Quảng Ninh",
  },
  {
    name: "Nha Trang",
  },
  {
    name: "Đà Lạt",
  },
  {
    name: "Phú Quốc",
  }
];