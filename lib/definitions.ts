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
