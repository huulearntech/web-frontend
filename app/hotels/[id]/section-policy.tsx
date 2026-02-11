import { CigaretteOff, Clock, ForkKnifeCrossed } from "lucide-react";

// TODO: fetch from API
const generalInformation = {
  "Popular Facilities": "AC, Restaurant, 24-Hour Front Desk, Elevator, WiFi",
  "Check-In / Check-Out Time": "From 14:00 - to 12:00",
  "Distance to Downtown": "2.01 km",
  "Popular in the Area": "Thu Cuc International General Hospital, West Lake",
  "Breakfast Availability": "Yes, hotel has room that provide breakfast",
  "Available rooms at Nature Hotel - Lac Long Quan": "60",
  "Number of floors in Nature Hotel - Lac Long Quan": "10",
  "Other facilities in Nature Hotel - Lac Long Quan": "Bellhop, Welcoming drinks, Early Check-in, Express check-in, Express check-out",
  "Nearby point of interest": "Lac Long Quan Street Ha Noi, Hanoi Heart Hospital - Facility 2, Westlake's Twin Dragons",
}

const policies = [
  {
    icon: Clock,
    title: "Check-in/Check-out time",
    description: "bla bla bla",
  },
  {
    icon: ForkKnifeCrossed,
    title: "Breakfast available",
    description: "bla bla bla",
  },
  {
    icon: CigaretteOff,
    title: "No smoking",
    description: "bla bla bla",
  },
]

export default function PolicySection() {
  const hotelName = "Nature Hotel - Lac Long Quan";
  return (
    <section id="policy" className="w-full flex flex-col scroll-mt-24 md:scroll-mt-30">
      <div className="rounded-4xl px-4 py-5 flex flex-col gap-y-5 shadow-xl">
        <h2 className="font-bold text-[1.25rem]">Accomodation policy at {hotelName}</h2>
        <ul className="[&>li]:border-b [&>li]:last:border-b-0 [&>li]:flex [&>li]:space-x-3 [&>li]:py-4 text-sm">
          {policies.map(({ icon: Icon, title, description }) => (
            <li key={title}>
              <Icon className="size-6" />
              <div className="flex flex-col space-y-2">
                <div className="font-bold">{title}</div>
                <div>{description}</div>
              </div>
            </li>
          ))}
        </ul>

        <h4 className="font-bold text-primary">General Information</h4>

        <table>
          <tbody>
            {
              Object.entries(generalInformation).map(([category, info]) => (
                <tr key={category} className="odd:bg-gray-200 text-sm font-medium">
                  <td className="w-[30%] p-2">{category}</td>
                  <td className="p-2">{info}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </section>
  )
};