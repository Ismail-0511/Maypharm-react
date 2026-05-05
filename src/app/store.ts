import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homePage/slice";
import reduxLogger from "redux-logger";
import productsPageReducer from "./screens/productsPage/slice";
import OrdersPageReducer from "./screens/ordersPage/slice";


export const store = configureStore({

  /** ReduxLogger bizga redux_storage da qanday  data borligini va qay xolatda ozgaarishini log qilib beradi**/

  middleware: (getDefaultMiddleWare) => 
    // @ts-ignore
  getDefaultMiddleWare().concat(reduxLogger),
  reducer: {
    homePage: HomePageReducer,
    productsPage: productsPageReducer,
    ordersPage: OrdersPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


export type AppRootState = ReturnType<typeof store.getState>;