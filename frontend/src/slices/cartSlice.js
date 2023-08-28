import { createSlice } from '@reduxjs/toolkit';
import { addDecimals } from '../utils/addDecimals';
import { updateCart } from '../utils/updateCart';

const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // The item to add to the cart
            const item = action.payload;

            // Check if the item is already in the cart
            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                // If exists, update quantity
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existItem._id ? item : x
                );
            } else {
                // If not exists, add new item to cartItems
                state.cartItems = [...state.cartItems, item];
            }

            // Calculate the items price
            state.itemsPrice = addDecimals(
                state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
            );

            // Calculate the shipping price | If items price is greater than 100, shipping is free | If not, shipping is 10
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

            // Calculate the tax price | Tax is 15% of the items price
            state.taxPrice = addDecimals(
                Number((0.15 * state.itemsPrice).toFixed(2))
            );

            // Calculate the total price | Total price is the sum of the items price, shipping price and tax price
            state.totalPrice = (
                Number(state.itemsPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            ).toFixed(2);

            // Save the cart to localStorage
            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeFromCart: (state, action) => {
            // Filter out the item to remove from the cart
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

            return updateCart(state)
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload

            return updateCart(state)
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem('cart', JSON.stringify(state));
        },

    },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, } = cartSlice.actions;

export default cartSlice.reducer;