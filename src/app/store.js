import { configureStore } from '@reduxjs/toolkit'
import netReducer from '../features/netSlice'
import controlsReducer from '../features/controlsSlice'

export const store = configureStore({
    reducer: {
        controls: controlsReducer,
        net: netReducer
    },
});
