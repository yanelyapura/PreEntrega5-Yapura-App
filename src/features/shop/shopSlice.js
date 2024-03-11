import { createSlice } from '@reduxjs/toolkit';
import shopData from '../../data.json';

const initialState = {
    categories: shopData.categories,
    products: shopData.products,
    orders: shopData.orders,
    selectedCategory: null,
    selectedProduct: null,
    cart: [],
    promotions: shopData.products.filter(product => product.discountPercentage > 0),
    recentlyVisited: [],
};

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        selectCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        selectProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        addSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        addToCart: (state, action) => {
            const existingIndex = state.cart.findIndex((item) => item.id === action.payload.id);

            if (existingIndex >= 0) {
                state.cart[existingIndex].quantity += 1;
            } else {
                const product = state.products.find(product => product.id === action.payload.id);
                if (product) {
                    state.cart.push({ ...product, quantity: 1 });
                }
            }
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
        },
        updateCartItemQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const existingIndex = state.cart.findIndex((item) => item.id === productId);
            if (existingIndex >= 0) {
                state.cart[existingIndex].quantity = quantity;
            }
        },
        acceptCartTransaction: (state) => {
            const newOrder = {
                id: `o${state.orders.length + 1}`,
                date: new Date().toISOString(),
                total: state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
                items: state.cart.map(item => ({ productId: item.id, quantity: item.quantity })),
            };
            state.orders.push(newOrder);
            state.cart = [];
        },
        cancelOrder: (state, action) => {
            state.orders = state.orders.filter(order => order.id !== action.payload);
        },
        buyNow: (state, action) => {
            const product = state.products.find(product => product.id === action.payload.id);
            if (product) {
                const newOrder = {
                    id: `o${state.orders.length + 1}`,
                    date: new Date().toISOString(),
                    total: product.price,
                    items: [{ productId: product.id, quantity: 1 }],
                };
                state.orders.push(newOrder);
            }
        },
        setPromotions: (state, action) => {
            state.promotions = action.payload;
        },
        addToRecentlyVisited: (state, action) => {
            const productId = action.payload;
            const existsIndex = state.recentlyVisited.findIndex(id => id === productId);
            
            if (existsIndex !== -1) {
                state.recentlyVisited.splice(existsIndex, 1); 
                state.recentlyVisited.unshift(productId);
            } else {
                if (state.recentlyVisited.length >= 3) {
                    state.recentlyVisited.pop(); 
                }
                state.recentlyVisited.unshift(productId); 
            }
        },
    },
});

export const { setCategories, setProducts, selectCategory, selectProduct, addToCart, removeFromCart, updateCartItemQuantity, acceptCartTransaction, cancelOrder, buyNow, setPromotions, addToRecentlyVisited, addSearchQuery } = shopSlice.actions;

export const selectShop = (state) => state.shop;

export default shopSlice.reducer;
