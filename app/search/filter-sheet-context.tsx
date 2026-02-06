"use client";

import { createContext, useContext, useState } from "react";

type FilterSheetContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const FilterSheetContext = createContext<FilterSheetContextType | null>(null);

export default function FilterSheetProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <FilterSheetContext.Provider
      value={{
        open: open,
        setOpen: setOpen,
      }}
    >
      {children}
    </FilterSheetContext.Provider>
  );
}

export function useFilterSheetContext() {
  const context = useContext(FilterSheetContext);
  if (context === null) {
    throw new Error("useFilterSheetContext must be used within a FilterSheetProvider");
  }
  return context;
}