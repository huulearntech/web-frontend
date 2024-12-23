import React, { useState } from "react";

// Admin page
const Admin = () => {
  const [selectedSection, setSelectedSection] = useState("rooms");

  const renderSection = () => {
    switch (selectedSection) {
      case "rooms":
        return <div>CRUD on hotel rooms</div>;
      case "users":
        return <div>Manage user accounts</div>;
      case "bookings":
        return <div>Manage bookings</div>;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="flex">
      <div className="w-1/5 border-r border-gray-300 p-4">
        <ul>
          <li className={`cursor-pointer py-2 ${selectedSection === "rooms" ? "font-bold" : ""}`} onClick={() => setSelectedSection("rooms")}>Hotel Rooms</li>
          <li className={`cursor-pointer py-2 ${selectedSection === "users" ? "font-bold" : ""}`} onClick={() => setSelectedSection("users")}>User Accounts</li>
          <li className={`cursor-pointer py-2 ${selectedSection === "bookings" ? "font-bold" : ""}`} onClick={() => setSelectedSection("bookings")}>Bookings</li>
        </ul>
      </div>
      <div className="w-4/5 p-4">
        {renderSection()}
      </div>
    </div>
  );
};

export default Admin;
