import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../types";

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

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
    }
    const data: Product[] = await res.json();
    return data;
});

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUS.IDLE;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = STATUS.ERROR;
            })
    }
})

export default productSlice.reducer;