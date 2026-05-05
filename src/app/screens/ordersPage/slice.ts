import { createSlice, Action } from '@reduxjs/toolkit';
import { OrdersPageState } from "../../../lib/types/screen";



// STATE 
const initialState: OrdersPageState = {
    pausedOrders: [],
    processOrders: [],
    finishedOrders: [],
}

// SLICE yaratyapmiz 
const ordersPageSlice = createSlice({
    name: "ordersPage",
    initialState,
    reducers: {
        setPausedOrders: (state, action) => { // state => state_ni ichidan, payload => useEffect_dan olinyapti(homePage.index.ts)
            state.pausedOrders = action.payload
        },
        setProcessOrders: (state, action) => { // state => state_ni ichidan, payload => useEffect_dan olinyapti(homePage.index.ts)
            state.processOrders = action.payload
        },
        setFinishedOrders: (state, action) => { // state => state_ni ichidan, payload => useEffect_dan olinyapti(homePage.index.ts)
            state.finishedOrders = action.payload
        },
    },
});

export const {setPausedOrders, setProcessOrders, setFinishedOrders} = ordersPageSlice.actions;

const OrdersPageReducer = ordersPageSlice.reducer;
export default OrdersPageReducer; // STORE ga joylash uchun export qilinyapti (yani biz reducerimizni store ga joylashimiz kerak DATA_ni olish uchun)