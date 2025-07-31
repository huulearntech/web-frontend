import { useContext, useState, createContext } from "react";

const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [amenities, setAmenities] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [sortOrder, setSortOrder] = useState("relevance");
  return (
    <FilterContext.Provider value={{ priceRange, setPriceRange, amenities, setAmenities, propertyTypes, setPropertyTypes, sortOrder, setSortOrder }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterContextProvider");
  }
  return context;
};