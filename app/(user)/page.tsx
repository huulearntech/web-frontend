import HeroSection from "./section-hero";
import WhyUsSection from "./section-why-us";
import Feed from "./section-feed";
import CouponSection from "./section-coupon";
import PartnersSection from "./section-partner";
import TopDestinationsSection from "./section-top-destinations";

export default function Home() {
  return (
    <main className="flex flex-col gap-y-12 lg:mt-6 mb-6">
      <HeroSection />
      <WhyUsSection />
      <Feed />
      <CouponSection />
      <PartnersSection />
      <TopDestinationsSection />
    </main>
  );
};