import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    priceRange: [100000, 20000000],
    amenities: [],
    propertyTypes: [],
    sortOrder: "Relevance",
  },
  reducers: {
    setPriceRange: (state, action) => {
      const [min, max] = action.payload;
      const [origMin, origMax] = [100000, 20000000];
      state.priceRange = [
        Math.max(origMin, Math.min(min, origMax)),
        Math.max(origMin, Math.min(max, origMax)),
      ];
    },
    setAmenities: (state, action) => {
      state.amenities = action.payload;
    },
    setPropertyTypes: (state, action) => {
      state.propertyTypes = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
});

export const { setPriceRange, setAmenities, setPropertyTypes, setSortOrder } = filtersSlice.actions;
export default filtersSlice.reducer;