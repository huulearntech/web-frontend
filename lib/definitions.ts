// TODO: Use the types from prisma
import type { StaticImageData } from "next/image";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type CouponProps = {
  title: string,
  description: string,
  code: string,
};

export type PopularDestination = {
  regionName: string,
  backgroundImage: StaticImageData
};

export type SearchPageProps = {
  spec: string,
  childSpec?: string;
}

// There is two type of rating: one is star, one is review point
export type HotelCardProps = { // This is for use in client. Result from server-action should be transformed to this type before passing to client
  id: string;
  name: string;
  thumbUrl: string; // We can also use imageUrls and show a carousel in the future, but for now let's just show one image
  reviewPoint: number; // This is the average review point, which is different from rating (star)
  numberOfReviews: number;
  wardName: string; // Maybe we should also include district and city?
  price: string; // What price should we show? The lowest price among all rooms? // string to avoid conversion loss
  facilities: string[]; // Do we need this? If so, how do we get it?
  type: string; // Do we need this? If so, how do we get it
};