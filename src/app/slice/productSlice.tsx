import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "src/api/axiosClients";
import { Category, Product } from "src/interface";

export interface ProductState {
    listCategory: Category[];
    listCombo: Product[];
    listBestseller: Product[];
    listProductMenu: Product[];
    loadingHome: boolean;
    loadingMenu: boolean;
    loading: boolean;
}

export const getCategory = createAsyncThunk(
    "getCategory",
    async ({}, thunkAPI) => {
        try {
            let resData = await axiosClient.post("api/category", {
                _method: "get",
            });
            return resData.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error });
        }
    }
);

export const getListProduct = createAsyncThunk(
    "getListProduct",
    async (id: number, thunkAPI) => {
        thunkAPI.dispatch(removeListProduct());
        try {
            let resData = await axiosClient.post(
                `api/category-with-product/${id}`,
                {
                    _method: "get",
                }
            );
            return resData.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error });
        }
    }
);
export const getListProductSale = createAsyncThunk(
    "getListProductSale",
    async ({}, thunkAPI) => {
        thunkAPI.dispatch(removeListProduct());
        try {
            let resData = await axiosClient.post(`api/products/sale`, {
                _method: "get",
            });
            return resData.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error });
        }
    }
);

export const getListProductHome = createAsyncThunk(
    "getListProductHome",
    async ({}, thunkAPI) => {
        try {
            let resData = await axiosClient.post(
                `api/home-product
            `,
                {
                    _method: "get",
                }
            );

            return resData.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error });
        }
    }
);

const initialState: ProductState = {
    listCategory: [] as Category[],
    listCombo: [] as Product[],
    listBestseller: [] as Product[],
    listProductMenu: [] as Product[],
    loadingHome: false,
    loadingMenu: false,
    loading: false,
};

export const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        removeListProduct: (state, action: PayloadAction<string>) => {
            state.listProductMenu = [] as Product[];
        },
    },
    extraReducers: {
        [getCategory.fulfilled.toString()]: (
            state,
            action: PayloadAction<Category[]>
        ) => {
            state.loading = false;
            state.listCategory = action.payload;
        },
        [getCategory.rejected.toString()]: (state, { payload }) => {
            state.loading = false;
        },
        [getCategory.pending.toString()]: (state) => {
            state.loading = true;
        },
        //////////////////////////////////////////////////////////////////
        [getListProduct.fulfilled.toString()]: (
            state,
            action: PayloadAction<Product[]>
        ) => {
            state.loadingMenu = false;
            state.listProductMenu = action.payload as Product[];
        },
        [getListProduct.rejected.toString()]: (state, { payload }) => {
            state.loadingMenu = false;
        },
        [getListProduct.pending.toString()]: (state) => {
            state.loadingMenu = true;
        },
        //////////////////////////////////////////////////////////////////
        [getListProductSale.fulfilled.toString()]: (
            state,
            action: PayloadAction<Product[]>
        ) => {
            state.loadingMenu = false;
            state.listProductMenu = action.payload as Product[];
        },
        [getListProductSale.rejected.toString()]: (state, { payload }) => {
            state.loadingMenu = false;
        },
        [getListProductSale.pending.toString()]: (state) => {
            state.loadingMenu = true;
        },
        //////////////////////////////////////////////////////////////////
        [getListProductHome.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingHome = false;
            state.listCombo = action.payload.data.sale as Product[];
            state.listBestseller = action.payload.data.bestSeller as Product[];
        },
        [getListProductHome.rejected.toString()]: (state, { payload }) => {
            state.loadingHome = false;
        },
        [getListProductHome.pending.toString()]: (state) => {
            state.loadingHome = true;
        },
        //////////////////////////////////////////////////////////////////
    },
});

// Action creators are generated for each case reducer function
export const { removeListProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
