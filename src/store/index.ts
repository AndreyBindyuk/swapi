import { configureStore } from '@reduxjs/toolkit'
import { peopleSlice } from './peopleSlice';

const store = configureStore({
    reducer: {
        people: peopleSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;