import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllSlideService } from "src/api/slideService";
import { Slider } from "../../interface";

export const getAllSlide = createAsyncThunk("getAllSlide", async () => {
    const resData = await getAllSlideService();
    return resData;
});

export interface CateMovieState {
    listSlide: Slider[];
    loading: boolean;
    loadingApi: boolean;
}

const initialState: CateMovieState = {
    listSlide: [] as Slider[],
    loading: false,
    loadingApi: false,
};

export const SlideSlice = createSlice({
    name: "SlideSlice",
    initialState,
    reducers: {
        oke: (state, action: PayloadAction<boolean>) => {},
    },
    extraReducers: {
        [getAllSlide.pending.toString()]: (state) => {
            state.loading = true;
        },
        [getAllSlide.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loading = false;
            state.listSlide = action.payload;
        },
        [getAllSlide.rejected.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loading = false;
        },
        //////////////////////////////////////////////////////////////////
    },
});

// Action creators are generated for each case reducer function
export const { oke } = SlideSlice.actions;
export default SlideSlice.reducer;
