import type { CouponProps } from "@/lib/definitions";

export interface HotelCardProps {
  id: string,
  name: string,
  imageSrcs: string[],
  location: string,
  price: number,
  rating: number,
  type: string,
  amenities: string[],
  numberOfReviews: number,
};

export const fake_hotels : HotelCardProps[] = [
  {
    id: '1',
    name: "Dummy hotel",
    imageSrcs: [
      "https://placehold.co/400x300.png?text=Main+Image",
      "https://placehold.co/400x300.png?text=Image+1",
      "https://placehold.co/400x300.png?text=Image+2",
      "https://placehold.co/400x300.png?text=Image+3"
    ],
    rating: 2.7,
    numberOfReviews: 100,
    type: "Hotel",
    location: "New York, USA",
    amenities: ["Wifi", "Parking", "Pool"],
    price: 129.99,
  },
  {
    id: '2',
    name: "Another dummy hotel",
    imageSrcs: [
      "https://placehold.co/400x300.png?text=Main+Image",
      "https://placehold.co/400x300.png?text=Image+1",
      "https://placehold.co/400x300.png?text=Image+2",
      "https://placehold.co/400x300.png?text=Image+3"
    ],
    rating: 2.8,
    numberOfReviews: 100,
    type: "Resort",
    location: "California, USA",
    amenities: ["Wifi", "Parking", "Pool", "Gym", "Spa"],
    price: 129.99,
  },
  {
    id: '3',
    name: "This is a very long name to test the overflow of the text afdp ouiiadso jhfdsak jnfdlsahju fhpsadhfwqhejrfjnvlksadbvlsdahuyufuiowqhfbldkjasdfhpqwr",
    imageSrcs: [
      "https://placehold.co/400x300.png?text=Main+Image",
      "https://placehold.co/400x300.png?text=Image+1",
      "https://placehold.co/400x300.png?text=Image+2",
      "https://placehold.co/400x300.png?text=Image+3"
    ],
    rating: 4.9,
    numberOfReviews: 100,
    type: "Apartment",
    location: "London, UK",
    amenities: ["Wifi", "Parking", "Pool", "Bar", "Restaurant"],
    price: 129.99,
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

export const coupons: Record<string, CouponProps[]> = {
  "hot_coupons": [
    {
      title: "title bla 1",
      description:  "title bla 1",
      code: "title bla 1",
    },
    {
      title: "title bla 2",
      description:  "title bla 2",
      code: "title bla 2",
    },
    {
      title: "title bla 3",
      description:  "title bla 3",
      code: "title bla 3",
    }
  ],
  "bank": [
    {
      title: "title bla 1",
      description:  "title bla 1",
      code: "title bla 1",
    },
    {
      title: "title bla 2",
      description:  "title bla 2",
      code: "title bla 2",
    },
    {
      title: "title bla 3",
      description:  "title bla 3",
      code: "title bla 3",
    }
  ],
  "zalopay": [
    {
      title: "title bla 1",
      description:  "title bla 1",
      code: "title bla 1",
    },
    {
      title: "title bla 2",
      description:  "title bla 2",
      code: "title bla 2",
    },
    {
      title: "title bla 3",
      description:  "title bla 3",
      code: "title bla 3",
    }
  ],
  "hot_location": [
    {
      title: "title bla 1",
      description:  "title bla 1",
      code: "title bla 1",
    },
    {
      title: "title bla 2",
      description:  "title bla 2",
      code: "title bla 2",
    },
    {
      title: "title bla 3",
      description:  "title bla 3",
      code: "title bla 3",
    }
  ],
}