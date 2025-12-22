import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_PATHS } from "../../utils/apiPaths";
import { axiosInstace } from "../../utils/axiosInstance";
import { logoutUser } from "./auth.slice";

export const getAllLinks = createAsyncThunk(
    'api/link/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstace.get(
                API_PATHS.LINK.GET_ALL_LINKS
            )
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const addLink = createAsyncThunk(
    'api/link/add',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstace.post(
                API_PATHS.LINK.ADD_LINK, data
            )
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateLink = createAsyncThunk(
    'api/link/update',
    async ({ data, id }, { rejectWithValue }) => {
        try {
            const response = await axiosInstace.patch(
                API_PATHS.LINK.UPDATE_LINK(id), data
            )
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteLink = createAsyncThunk(
    'api/link/delete',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstace.delete(
                API_PATHS.LINK.DELETE_LINK(id),
            )
            return { id: id, message: response.data?.message }
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const linkSlice = createSlice({
    name: 'link',
    initialState: {
        allLinks: null,
        fetchingLinks: true,
        savingLink: false,
        deletingLink: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllLinks.pending, (state) => {
                state.fetchingLinks = true
            })
            .addCase(getAllLinks.fulfilled, (state, action) => {
                state.fetchingLinks = false
                state.allLinks = action.payload.links
            })
            .addCase(getAllLinks.rejected, (state, action) => {
                state.fetchingLinks = false
                state.error = action.payload
            })
            .addCase(addLink.pending, (state) => {
                state.savingLink = true
            })
            .addCase(addLink.fulfilled, (state, action) => {
                state.savingLink = false
                state.allLinks = [action.payload.link, ...state.allLinks]
            })
            .addCase(addLink.rejected, (state, action) => {
                state.savingLink = false
                state.error = action.payload
            })
            .addCase(updateLink.pending, (state) => {
                state.savingLink = true
            })
            .addCase(updateLink.fulfilled, (state, action) => {
                state.savingLink = false
                const index = state.allLinks.findIndex(
                    (link) => link._id === action.payload?.updatedLink?._id
                )
                if (index != -1) {
                    state.allLinks[index] = action.payload?.updatedLink
                }
            })
            .addCase(updateLink.rejected, (state, action) => {
                state.savingLink = false
                state.error = action.payload
            })
            .addCase(deleteLink.pending, (state) => {
                state.deletingLink = true
            })
            .addCase(deleteLink.fulfilled, (state, action) => {
                state.deletingLink = false
                state.allLinks = state.allLinks.filter(
                    (link) => link._id != action.payload.id
                )
            })
            .addCase(deleteLink.rejected, (state, action) => {
                state.deletingLink = false
                state.error = action.payload
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.allLinks = null
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export default linkSlice.reducer