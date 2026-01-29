import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "./cartSlice";

export const STATUS = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
})

export type StatusType = typeof STATUS[keyof typeof STATUS];

interface ProductState {
    data: Product[];
    status: StatusType;
}

const initialState: ProductState = {
    data: [],
    status: STATUS.IDLE,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = STATUS.LOADING;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUS.IDLE;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = STATUS.ERROR;
            })
    }
})

export default productSlice.reducer;

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data: Product[] = await res.json();
    return data;
});

// export function fetchProducts() {
//     return async function fetchProductThunk(dispatch, getstate) {
//         dispatch(setStatus(STATUS.LOADING));
//         try {
//             const res = await fetch('https://fakestoreapi.com/products');
//             const data = await res.json();
//             dispatch(setProducts(data));
//             dispatch(setStatus(STATUS.IDLE));
//         } catch (err) {
//             dispatch(setStatus(STATUS.ERROR));
//         }
//     }
// }