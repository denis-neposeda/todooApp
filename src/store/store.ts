import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { authReducer, todoListReducer } from "./reducers";

const rootReducer = combineReducers({
  todoList: todoListReducer,
  auth: authReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
