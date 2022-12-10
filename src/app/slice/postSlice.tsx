import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "src/api/axiosClients";
import { error, success, warning } from "src/features/noti";
import { Blog, Order, Product, ProductCart, Shop } from "src/interface";

export interface PostState {
    loadingSale: boolean;
    loadingBlog: boolean;
    listSale: Blog[];
    listBlog: Blog[];
}
export const getListBlog = createAsyncThunk("getListBlog", async () => {
    const res = await axiosClient.post("api/blog", {
        _method: "get",
    });
    return res.data;
});

export const getListSale = createAsyncThunk("getListSale", async () => {
    const res = await axiosClient.post("api/sale", {
        _method: "get",
    });
    return res.data;
});

const initialState: PostState = {
    listSale: [] as Blog[],
    listBlog: [] as Blog[],
    loadingSale: false,
    loadingBlog: false,
};

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        openCart: (state, action: PayloadAction<boolean>) => {},
    },
    extraReducers: {
        [getListBlog.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingBlog = false;
            state.listBlog = action.payload;
        },
        [getListBlog.rejected.toString()]: (state, { payload }) => {
            state.loadingBlog = false;
        },
        [getListBlog.pending.toString()]: (state) => {
            state.loadingBlog = true;
        },
        ////////////////////////////////////////////////////////////////
        [getListSale.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingSale = false;
            state.listSale = action.payload;
        },
        [getListSale.rejected.toString()]: (state, { payload }) => {
            state.loadingSale = false;
        },
        [getListSale.pending.toString()]: (state) => {
            state.loadingSale = true;
        },
        ////////////////////////////////////////////////////////////////
    },
});

// Action creators are generated for each case reducer function
export const { openCart } = postSlice.actions;
export default postSlice.reducer;
