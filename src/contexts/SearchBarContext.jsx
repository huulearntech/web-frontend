import { useContext, useState, createContext } from "react";

const SearchBarContext = createContext();

export const SearchBarContextProvider = ({ children }) => {
  const [location, setLocation] = useState("");
  const [checkInOut, setCheckInOut] = useState([null, null]);
  const [guestsAndRooms, setGuestsAndRooms] = useState({
    adults: 2,
    children: 0,
    rooms: 1,
  });
  const [warningAdultRoom, setWarningAdultRoom] = useState(false);
  return (
    <SearchBarContext.Provider value={{ location, setLocation, checkInOut, setCheckInOut, guestsAndRooms, setGuestsAndRooms, warningAdultRoom, setWarningAdultRoom }}>
      {children}
    </SearchBarContext.Provider>
  );
};

export const useSearchBar = () => {
  const context = useContext(SearchBarContext);
  if (!context) {
    throw new Error("useSearchBar must be used within a SearchBarContextProvider");
  }
  return context;
};