import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FiltersState = {
  q: string;
  category: string | null;
  sort: "rating" | "price_asc" | "price_desc" | "name" | null;
};

const initialState: FiltersState = { q: "", category: null, sort: null };

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.q = action.payload;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
    },
    setSort: (
      state,
      action: PayloadAction<FiltersState["sort"]>
    ) => {
      state.sort = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setQuery, setCategory, setSort, resetFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
