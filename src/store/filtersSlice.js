import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    priceRange: [100000, 20000000],
    checkboxGroups: {
      amenities: [],
      propertyTypes: [],
    },
    sortOrder: "Popularity",
  },
  reducers: {
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setCheckboxGroup: (state, action) => {
      const { group, selectedOptions } = action.payload;
      state.checkboxGroups[group] = selectedOptions;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
});

export const { setPriceRange, setCheckboxGroup, setSortOrder } = filtersSlice.actions;
export default filtersSlice.reducer;