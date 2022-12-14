import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "src/api/axiosClients";
import { error, success, warning } from "src/features/noti";
import { Order, Product, ProductCart, Shop, Voucher } from "src/interface";

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
    oderSuccess: boolean;
    voucher: Voucher | null;
    loadingCheckCode: boolean;
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
            thunkAPI.dispatch(setOderSuccess(true));
            thunkAPI.dispatch(getListProductToCart());
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

export const checkCode = createAsyncThunk(
    "checkCode",
    async (code: string, thunkAPI) => {
        let resData = await axiosClient.post(`api/use-voucher `, {
            code: code,
        });
        return resData.data;
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
    oderSuccess: false,
    voucher: null,
    loadingCheckCode: false,
};

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        openCart: (state, action: PayloadAction<boolean>) => {
            state.isOpenCart = action.payload;
        },
        setOderSuccess: (state, action: PayloadAction<boolean>) => {
            state.oderSuccess = action.payload;
        },
        setVoucher: (state, action: PayloadAction<Voucher | null>) => {
            state.voucher = action.payload;
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
            console.log("l??ixxxxxx");
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
            success("Th??m s???n ph???m v??o gi??? h??ng th??nh c??ng.");
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
            success("X??a s???n ph???m kh???i gi??? h??ng th??nh c??ng.");
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
            success("T???o ????n h??ng th??nh c??ng.!!!!");
        },
        [orderProduct.rejected.toString()]: (state, { payload }) => {
            state.loadingOrder = false;
            if (payload.error?.response.status === 424) {
                error(payload.error?.response.data.message);
            } else error("L???i t??? server.!!!");
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
            success("H???y ????n th??nh c??ng.");
        },
        [cancelOrder.rejected.toString()]: (state, { payload }) => {
            state.loadingCancelOrder = false;
            warning("H???y ????n th???t b???i.");
        },
        [cancelOrder.pending.toString()]: (state) => {
            state.loadingCancelOrder = true;
        },
        ////////////////////////////////////////////////////////////////
        [checkCode.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingCheckCode = false;
            state.voucher = action.payload.data;
        },
        [checkCode.rejected.toString()]: (state, { payload }) => {
            state.loadingCheckCode = false;
            warning("M?? kh??ng s??? d???ng ???????c.");
        },
        [checkCode.pending.toString()]: (state) => {
            state.loadingCheckCode = true;
        },
        ////////////////////////////////////////////////////////////////
    },
});

// Action creators are generated for each case reducer function
export const { openCart, setOderSuccess, setVoucher } = CartSlice.actions;
export default CartSlice.reducer;
