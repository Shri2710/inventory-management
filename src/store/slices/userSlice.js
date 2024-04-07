import { createSlice } from "@reduxjs/toolkit";

const userSlice  = createSlice({
    name:"User",
    initialState:'admin',
    reducers:{
        toggleUser:(state,action)=>{
            return state === 'admin' ? 'user' : 'admin';
        }
    }
});

export const {toggleUser} = userSlice.actions;
export default userSlice.reducer;