import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '@/store/slice/todosSlice'
import sidebarReducer from '@/store/slice/sidebarSlice'

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        sidebar: sidebarReducer,
    },
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
