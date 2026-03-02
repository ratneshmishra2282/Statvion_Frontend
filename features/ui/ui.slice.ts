import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  selectedAcademicYear: string;
}

const initialState: UIState = {
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
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
    setMobileSidebarOpen(state, action: PayloadAction<boolean>) {
      state.mobileSidebarOpen = action.payload;
    },
    setAcademicYear(state, action: PayloadAction<string>) {
      state.selectedAcademicYear = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarCollapsed, setMobileSidebarOpen, setAcademicYear } =
  uiSlice.actions;
export default uiSlice.reducer;
