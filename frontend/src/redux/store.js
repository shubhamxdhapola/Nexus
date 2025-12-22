import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/auth.slice.js'
import uploadSlice from './slices/upload.slice.js'
import themeSlice from './slices/theme.slice.js'
import linkSlice from './slices/link.slice.js'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        upload: uploadSlice,
        theme: themeSlice,
        link: linkSlice
    }
})