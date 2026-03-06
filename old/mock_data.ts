import type { CouponProps } from "@/lib/definitions";
import type { Hotel } from "@/lib/generated/prisma/client";

export const fake_hotels : Hotel[] = [
  {
    name: "Dummy hotel",
    id: '1',
    ownerId: '1',
    wardId: "1",
    imageUrls: [
      "https://placehold.co/400x300.png?text=Main+Image",
      "https://placehold.co/400x300.png?text=Image+1",
      "https://placehold.co/400x300.png?text=Image+2",
      "https://placehold.co/400x300.png?text=Image+3"
    ],
    rating: 2.7,

    createdAt: new Date(),
    updatedAt: new Date(),
    checkInTime: new Date(),
    checkOutTime: new Date(),
    breakfastAvailability: true,
    longitude: 106.6297,
    latitude: 10.8231,
    description: "This is a dummy hotel for testing purposes. It has a lot of amenities and a great location.",
    
    // numberOfReviews: 100, // TODO
    // type: "Hotel",
    // location: "New York, USA",
    // amenities: ["Wifi", "Parking", "Pool"],
    // price: 129.99,
  },
  {
    id: '2',
    name: "Another dummy hotel",
    ownerId: '1',
    wardId: "1",
    imageUrls: [
      "https://placehold.co/400x300.png?text=Main+Image",
      "https://placehold.co/400x300.png?text=Image+1",
      "https://placehold.co/400x300.png?text=Image+2",
      "https://placehold.co/400x300.png?text=Image+3"
    ],
    rating: 2.8,

    createdAt: new Date(),
    updatedAt: new Date(),
    checkInTime: new Date(),
    checkOutTime: new Date(),
    breakfastAvailability: true,
    longitude: 106.6297,
    latitude: 10.8231,
    description: "This is a dummy hotel for testing purposes. It has a lot of amenities and a great location.",
  },
  {
    id: '3',
    name: "This is a very long name to test the overflow of the text afdp ouiiadso jhfdsak jnfdlsahju fhpsadhfwqhejrfjnvlksadbvlsdahuyufuiowqhfbldkjasdfhpqwr",
    ownerId: '1',
    wardId: "1",
    imageUrls: [
      "https://placehold.co/400x300.png?text=Main+Image",
      "https://placehold.co/400x300.png?text=Image+1",
      "https://placehold.co/400x300.png?text=Image+2",
      "https://placehold.co/400x300.png?text=Image+3"
    ],
    rating: 4.9,

    createdAt: new Date(),
    updatedAt: new Date(),
    checkInTime: new Date(),
    checkOutTime: new Date(),
    breakfastAvailability: true,
    longitude: 106.6297,
    latitude: 10.8231,
    description: "This is a dummy hotel for testing purposes. It has a lot of amenities and a great location.",
  },
];

export const fake_locations = [
    "Hà Nội",
    "Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
    "Vũng Tàu",
    "Quảng Ninh",
    "Nha Trang",
    "Đà Lạt",
    "Phú Quốc",
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