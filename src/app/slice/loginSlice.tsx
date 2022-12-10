import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "src/api/axiosClients";
import { error, success, warning } from "src/features/noti";
import { User } from "src/interface";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorge, removeStorage, setStorage } from "src/utils/localStorage";
import { register } from "../../api/index";
import { auth, provider } from "src/utils/firebase";

export interface LoginState {
    isLogin: boolean;
    isLoginSocial: boolean;
    user: User | null;
    token: string;
    messageError: string;
    loadingLogin: boolean;
    loading: boolean;
    loadingChangePass: boolean;
}

export const userLogin = createAsyncThunk(
    "userLogin",
    async (logindata: { email: string; password: string }, thunkAPI) => {
        try {
            let resData = await axiosClient.post("api/auth/login", logindata);
            return resData.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error });
        }
    }
);

export const loginSocial = createAsyncThunk(
    "loginSocial",
    async ({}, thunkAPI) => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            const user = result.user;
            const loginSocialData = {
                name: user.displayName,
                email: user.email,
                password: user.uid,
            };
            try {
                let resData = await axiosClient.post(
                    "api/auth/login-social",
                    loginSocialData
                );
                return resData.data;
            } catch (error) {
                return thunkAPI.rejectWithValue({ error: error });
            }
        } catch (error) {
            error("Lỗi đăng nhập google");
        }
    }
);

export const checkMe = createAsyncThunk("checkMe", async ({}, thunkAPI) => {
    let resData = await axiosClient.post("api/get-me", {
        _method: "get",
    });
    return resData.data;
});

export const changePass = createAsyncThunk(
    "changePass",
    async (
        changePassData: {
            currentpassword: string;
            newpassword: string;
            repassword: string;
        },
        thunkAPI
    ) => {
        console.log(changePassData);
        try {
            let resData = await axiosClient.post("api/change-password", {
                old_password: changePassData.currentpassword,
                password: changePassData.newpassword,
                password_confirmation: changePassData.repassword,
            });
            return resData.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error });
        }
    }
);

export const userRegister = createAsyncThunk(
    "userRegister",
    async (Registerdata: { email: string; password: string; name: string }) => {
        const res = await register(Registerdata);
        return res.data;
    }
);

const initialState: LoginState = {
    isLogin: false,
    isLoginSocial: false,
    user: null,
    token: getStorge("token") ? getStorge("token") : "",
    loadingLogin: false,
    messageError: "",
    loading: false,
    loadingChangePass: false,
};

export const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logOut: (state, action: PayloadAction<string>) => {
            state.isLogin = false;
            state.isLoginSocial = false;
            state.user = {} as User;
            state.token = "";
            removeStorage("token");
        },
    },
    extraReducers: {
        [userLogin.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingLogin = false;
            state.token = action.payload.token as string;
            state.user = action.payload.user as User;
            state.isLogin = true;
            setStorage("token", state.token.toString());
            success("Đăng nhập thành công!!!");
        },
        [userLogin.rejected.toString()]: (state, { payload }) => {
            state.loadingLogin = false;
            if (payload.error.response?.status) {
                let statusCode = payload.error.response.status;
                if (statusCode === 422)
                    warning("Email hoặc mật khẩu không đúng định dạng!!!");

                if (statusCode === 401)
                    error("Tài khoẳn mặc mật khẩu không đúng!!!");
            } else error("ERROR");
        },
        [userLogin.pending.toString()]: (state) => {
            state.loadingLogin = true;
        },
        //////////////////////////////////////////////////////////////////
        [checkMe.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.user = action.payload as User;
            state.isLogin = true;
        },
        [checkMe.rejected.toString()]: (state, { payload }) => {
            state.loading = false;
            removeStorage("token");
        },
        [checkMe.pending.toString()]: (state) => {
            state.loading = true;
        },
        //////////////////////////////////////////////////////////////////
        [loginSocial.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingLogin = false;
            state.token = action.payload.token as string;
            state.user = action.payload.user as User;
            state.isLogin = true;
            state.isLoginSocial = true;
            setStorage("token", state.token.toString());
            success("Đăng nhập thành công!!!");
        },
        [loginSocial.rejected.toString()]: (state, { payload }) => {
            state.loadingLogin = false;
            error("Lỗi đăng nhập");
        },
        [loginSocial.pending.toString()]: (state) => {
            state.loadingLogin = true;
        },
        //////////////////////////////////////////////////////////////////
        [userRegister.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            success("Tạo tài khoản thành công!!!");
            state.loadingLogin = false;
        },
        [userRegister.rejected.toString()]: (state, { payload }) => {
            state.loadingLogin = false;
        },
        [userRegister.pending.toString()]: (state) => {
            state.loadingLogin = true;
        },
        //////////////////////////////////////////////////////////////////
        [changePass.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loadingChangePass = false;
            console.log(action.payload);
            success("Đổi mật khẩu thành công!!!");
        },
        [changePass.rejected.toString()]: (state, { payload }) => {
            state.loadingChangePass = false;
            console.log(payload);
            error("Đổi mật khẩu thất bại!!!");
        },
        [changePass.pending.toString()]: (state) => {
            state.loadingChangePass = true;
        },
    },
});

// Action creators are generated for each case reducer function
export const { logOut } = LoginSlice.actions;
export default LoginSlice.reducer;
