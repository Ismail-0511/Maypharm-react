import { createSlice} from "@reduxjs/toolkit";
import { ProductsPageState } from "../../../lib/types/screen";


// STATE 
const initialState: ProductsPageState = {
    company: null,
    chosenProduct: null,
    products: []
}

// SLICE yaratyapmiz 
const productsPageSlice = createSlice({
    name: "productsPage",
    initialState,
    reducers: {
        setcompany: (state, action) => {
            state.company = action.payload
        },
        setChosenPoduct: (state, action) => {
            state.chosenProduct = action.payload
        },
        setProducts: (state, action) => {
            state.products = action.payload
        },
    },
});

export const { setcompany, setChosenPoduct, setProducts } = productsPageSlice.actions;

const productsPageReducer = productsPageSlice.reducer;
export default productsPageReducer; // STORE ga joylash uchun export qilinyapti (yani biz reducerimizni store ga joylashimiz kerak DATA_ni olish uchun) 