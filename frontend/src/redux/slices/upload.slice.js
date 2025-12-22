import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstace } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

export const uploadImage = createAsyncThunk(
    'api/upload',
    async(image, {rejectWithValue}) => {
        try {
            const response = await axiosInstace.post(
                `${API_PATHS.IMAGE.UPLOAD}`, image
            )
            return response.data.profilePic    
        } catch(err) {
            console.log("Error in uploading image : ", err)
            return rejectWithValue("Unable to upload image")
        }
    }
)

const uploadSlice = createSlice({
    name : 'upload',
    initialState : {
        uploading : false,
        error : null,
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(uploadImage.pending, (state) => {
            state.uploading = true
        })
        .addCase(uploadImage.fulfilled, (state) => {
            state.uploading = false
        })
        .addCase(uploadImage.rejected, (state, action) => {
            state.uploading = false
            state.error = action.payload
        })
    }
})

export default uploadSlice.reducer