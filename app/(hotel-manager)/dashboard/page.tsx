import HotelManagerDashboardBookingsPage from "./bookings/page";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Hotel Manager Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Manage bookings, track income, and keep rooms running smoothly.
          </p>
        </div>
      </header>
      <HotelManagerDashboardBookingsPage />
    </div>
  );
};