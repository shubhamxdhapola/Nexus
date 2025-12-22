import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_PATHS } from "../../utils/apiPaths";
import { axiosInstace } from "../../utils/axiosInstance";

export const registerUser = createAsyncThunk(
    'auth//register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstace.post(
                API_PATHS.AUTH.REGISTER, userData
            )
            return {
                ...response.data.user,
                message: "Registered successfully"
            }
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstace.post(
                API_PATHS.AUTH.LOGIN, userData
            )
            return {
                ...response.data.user,
                message: "Logged in successfully"
            }
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstace.post(
                API_PATHS.AUTH.LOGOUT
            )
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.message)
        }
    }
)

export const googleSignIn = createAsyncThunk(
    'auth/google-signin',
    async (token, { rejectWithValue }) => {
        try {
            const response = await axiosInstace.post(
                API_PATHS.AUTH.GOOGLE_SIGNIN, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return {
                ...response.data.user,
                message: "Signed in successfully"
            }
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getUserInfo = createAsyncThunk(
    'auth/get-profile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstace.get(
                API_PATHS.AUTH.GET_PROFILE
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.message)
        }
    }
)

export const updateUser = createAsyncThunk(
    '/api/user/update-profile',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstace.patch(
                API_PATHS.USER.UPDATE_PROFILE, data
            )
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const authSlice = createSlice({

    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        authenticating: true,
        error: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(googleSignIn.pending, (state) => {
                state.loading = true
            })
            .addCase(googleSignIn.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(googleSignIn.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false
                state.user = null
                state.allLinks = null
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getUserInfo.pending, (state) => {
                state.authenticating = true
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.authenticating = false
                state.user = action.payload
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.authenticating = false
                state.error = action.payload
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.updatedUser
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default authSlice.reducer