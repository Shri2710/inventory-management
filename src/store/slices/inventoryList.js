import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

export const fetchInventoryList = createAsyncThunk('fetchInventoryList',async ()=>{
    const response = await fetch('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory');
    return response.json();
})

const inventoryListSlice = createSlice({
    name:'InventoryList',
    initialState:{
        isLoading:false,
        data:[],
        isError:false
    },
    reducers:{
        editItem:(state,action)=>{
            const list = state.data;
            const index = list.findIndex((li)=> li.name === action.payload.name);
            let requiredItem = list[index];
        
            if(!requiredItem.editMode || action.payload.type === 'cancel'){
            requiredItem.editMode = !requiredItem.editMode;
            return void{...state,data:list.splice(index,1,requiredItem)}
            }else{
                requiredItem.editMode = !requiredItem.editMode;
                return void{...state,data:list.splice(index,1,action.payload.item)}
            }
        },
        deleteItem:(state,action)=>{
            const list = state.data;
            return {...state,data:list.filter((li)=> li.name !== action.payload)};
        },
        toggleVisibiltyOfItem:(state,action)=>{
            const list = state.data;
            const index = list.findIndex((li)=> li.name === action.payload);
            const requiredItem = list[index];
            requiredItem.disabled  = !requiredItem.disabled;

            return void{...state,data:list.splice(index,1,requiredItem)}
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchInventoryList.pending,(state,action)=>{
            state.isLoading = true;
        })

        builder.addCase(fetchInventoryList.fulfilled,(state,action)=>{
            state.isLoading  =false;
            const listWithDisableAttribute = action.payload.map((list)=> {
                return {...list,disabled:false,editMode:false}
            })
            state.data = listWithDisableAttribute;
        })

        builder.addCase(fetchInventoryList.rejected,(state,action)=>{
            console.log("Error while Fetching Inventory: ",action.payload);
            state.isLoading = false;
            state.data = [];
            state.isError = true;
        })
    }
})


export const {editItem,deleteItem,toggleVisibiltyOfItem} = inventoryListSlice.actions;
export default inventoryListSlice.reducer;