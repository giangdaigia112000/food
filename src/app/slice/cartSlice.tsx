import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "src/api/axiosClients";
import { error, success, warning } from "src/features/noti";
import { Order, Product, ProductCart, Shop } from "src/interface";

export interface CartState {
    isOpenCart: boolean;
    loadingAddCart: boolean;
    loading: boolean;
    loadingOrder: boolean;
    loadingPageOrder: boolean;
    loadingCancelOrder: boolean;
    listProductCart: ProductCart[];
    listShop: Shop[];
    listOder: Order[];
}
export const getListProductToCart = createAsyncThunk(
    "getListProductToCart",
    async ({}, thunkAPI) => {
        try {
            let resData = await axiosClient.post("api/cart", {
                _method: "get",
            });
            return resData.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error });
        }
    }
);

export const deleteProductToCart = createAsyncThunk(
    "deleteProductToCart",
    async (id: number, thunkAPI) => {
        try {
            let resData = await axiosClient.post(`api/cart/${id}`, {
                _method: "delete",
            });
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error });
        }
    }
);

export const addProductToCart = createAsyncThunk(
    "addProductToCart",
    async (
        adddata: {
            product_id: number;
            quantity: number;
            product_options: number;
        },
        thunkAPI
    ) => {
        try {
            let resData = await axiosClient.post("api/cart", adddata);
            thunkAPI.dispatch(getListProductToCart());
            return resData.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error });
        }
    }
);

export const getListShop = createAsyncThunk(
    "getListShop",
    async ({}, thunkAPI) => {
        try {
            let resData = await axiosClient.post("api/shop", {
                _method: "get",
            });
            return resData.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error });
        }
    }
);

export const orderProduct = createAsyncThunk(
    "orderProduct",
    async (infoCus: any, thunkAPI) => {
        try {
            let resData = await axiosClient.post("api/order", {
                ...infoCus,
            });
            thunkAPI.dispatch(getListProductToCart());
            console.log(resData.data);

            return resData.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error });
        }
    }
);
export const getListOrder = createAsyncThunk(
    "getListOrder",
    async ({}, thunkAPI) => {
        try {
            let resData = await axiosClient.post("api/order", {
                _method: "get",
            });

            return resData.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error });
        }
    }
);

export const cancelOrder = createAsyncThunk(
    "cancelOrder",
    async (id: number, thunkAPI) => {
        try {
            let resData = await axiosClient.post(`api/order/${id}`, {
                _method: "delete",
            });
            thunkAPI.dispatch(getListOrder());
            return resData.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error });
        }
    }
);

const initialState: CartState = {
    isOpenCart: false,
    loadingAddCart: false,
    loading: false,
    loadingOrder: false,
    loadingPageOrder: false,
    loadingCancelOrder: false,
    listProductCart: [] as ProductCart[],
    listShop: [] as Shop[],
    listOder: [] as Order[],
};

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        openCart: (state, action: PayloadAction<boolean>) => {
            state.isOpenCart = action.payload;
        },
    },
    extraReducers: {
        [getListProductToCart.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loading = false;
            state.listProductCart = action.payload;
        },
        [getListProductToCart.rejected.toString()]: (state, { payload }) => {
            state.loading = false;
            console.log("lôixxxxxx");
        },
        [getListProductToCart.pending.toString()]: (state) => {
            state.loading = true;
        },
        ////////////////////////////////////////////////////////////////
        [addProductToCart.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingAddCart = false;
            success("Thêm sản phẩm vào giỏ hàng thành công.");
        },
        [addProductToCart.rejected.toString()]: (state, { payload }) => {
            state.loadingAddCart = false;
        },
        [addProductToCart.pending.toString()]: (state) => {
            state.loadingAddCart = true;
        },
        ////////////////////////////////////////////////////////////////
        [deleteProductToCart.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingAddCart = false;
            state.listProductCart = state.listProductCart.filter(
                (product) => product.id !== action.payload
            );
            success("Xóa sản phẩm khỏi giỏ hàng thành công.");
        },
        [deleteProductToCart.rejected.toString()]: (state, { payload }) => {
            state.loadingAddCart = false;
        },
        [deleteProductToCart.pending.toString()]: (state) => {
            state.loadingAddCart = true;
        },
        ////////////////////////////////////////////////////////////////
        [getListShop.fulfilled.toString()]: (
            state,
            action: PayloadAction<Shop[]>
        ) => {
            state.listShop = action.payload;
        },
        [getListShop.rejected.toString()]: (state, { payload }) => {
            warning("Loixxx");
        },
        [getListShop.pending.toString()]: (state) => {},
        ////////////////////////////////////////////////////////////////
        [orderProduct.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingOrder = false;
            success("Tạo đơn hàng thành công.!!!!");
        },
        [orderProduct.rejected.toString()]: (state, { payload }) => {
            state.loadingOrder = false;
            if (payload.error?.response.status === 424) {
                error(payload.error?.response.data.message);
            } else error("Lỗi từ server.!!!");
        },
        [orderProduct.pending.toString()]: (state) => {
            state.loadingOrder = true;
        },
        ////////////////////////////////////////////////////////////////
        [getListOrder.fulfilled.toString()]: (
            state,
            action: PayloadAction<Order[]>
        ) => {
            state.loadingPageOrder = false;
            state.listOder = action.payload;
        },
        [getListOrder.rejected.toString()]: (state, { payload }) => {
            state.loadingPageOrder = false;
        },
        [getListOrder.pending.toString()]: (state) => {
            state.loadingPageOrder = true;
        },
        ////////////////////////////////////////////////////////////////
        [cancelOrder.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingCancelOrder = false;
            success("Hủy đơn thành công.");
        },
        [cancelOrder.rejected.toString()]: (state, { payload }) => {
            state.loadingCancelOrder = false;
            warning("Hủy đơn thất bại.");
        },
        [cancelOrder.pending.toString()]: (state) => {
            state.loadingCancelOrder = true;
        },
        ////////////////////////////////////////////////////////////////
    },
});

// Action creators are generated for each case reducer function
export const { openCart } = CartSlice.actions;
export default CartSlice.reducer;
