import { createSlice, Action } from '@reduxjs/toolkit';
import { HomePageState } from "../../../lib/types/screen";



// STATE 
const initialState: HomePageState = {
    PopularProducts: [],
    NewArrivals: [],
    topUsers: [],
}

// SLICE yaratyapmiz 
const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setPopularProducts: (state, action) => { // state => state_ni ichidan, payload => useEffect_dan olinyapti(homePage.index.ts)
            state.PopularProducts = action.payload
        },
        setNewArrivals: (state, action) => { // state => state_ni ichidan, payload => useEffect_dan olinyapti(homePage.index.ts)
            state.NewArrivals = action.payload
        },
        setTopUsers: (state, action) => { // state => state_ni ichidan, payload => useEffect_dan olinyapti(homePage.index.ts)
            state.topUsers = action.payload
        },
    },
});

export const {setPopularProducts, setNewArrivals, setTopUsers} = homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer; // STORE ga joylash uchun export qilinyapti (yani biz reducerimizni store ga joylashimiz kerak DATA_ni olish uchun)
