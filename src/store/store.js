import { configureStore } from "@reduxjs/toolkit";
import inventoryListReducer from "./slices/inventoryList";
import userReducer from "./slices/userSlice";

export const store = configureStore({
    reducer:{
        inventory:inventoryListReducer,
        user:userReducer
    }
})