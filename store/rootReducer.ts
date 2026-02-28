import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/auth.slice";
import uiReducer from "@/features/ui/ui.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
