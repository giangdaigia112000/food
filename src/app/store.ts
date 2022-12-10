import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import loginReducer from "./slice/loginSlice";
import productReducer from "./slice/productSlice";
import cardReducer from "./slice/cartSlice";
import postReducer from "./slice/postSlice";
import slideReducer from "./slice/slideSlice";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        product: productReducer,
        card: cardReducer,
        post: postReducer,
        slide: slideReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>;

export default store;
