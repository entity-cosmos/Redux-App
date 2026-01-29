import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

const initialState: Product[] = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add(state, action: PayloadAction<Product>) {
            state.push(action.payload)
        },
        remove(state, action: PayloadAction<number>) {
            return state.filter(item => item.id !== action.payload)
        }
    }
})

export const { add, remove } = cartSlice.actions;

export default cartSlice.reducer;