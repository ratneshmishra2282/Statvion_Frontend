import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  sidebarCollapsed: boolean;
  selectedAcademicYear: string;
}

const initialState: UIState = {
  sidebarCollapsed: false,
  selectedAcademicYear: "2025-2026",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload;
    },
    setAcademicYear(state, action: PayloadAction<string>) {
      state.selectedAcademicYear = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarCollapsed, setAcademicYear } =
  uiSlice.actions;
export default uiSlice.reducer;
