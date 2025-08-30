import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface TodosState {
    items: Todo[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TodosState = {
    items: [],
    status: 'idle',
    error: null,
};

// Fetch todos
export const fetchTodos = createAsyncThunk<Todo[]>(
    'todos/fetchTodos',
    async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
        return response.data;
    }
);

// Add todo
export const addTodo = createAsyncThunk<Todo, string>(
    'todos/addTodo',
    async (title: string) => {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
            title,
            completed: false,
        });
        return response.data;
    }
);

// Delete todo
export const deleteTodo = createAsyncThunk<number, number>(
    'todos/deleteTodo',
    async (id: number) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        return id;
    }
);

// ✅ Update todo
export const updateTodo = createAsyncThunk<Todo, { id: number; title: string }>(
    'todos/updateTodo',
    async ({ id, title }) => {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            id,
            title,
            completed: false,
        });
        return response.data;
    }
);

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch todos';
            })
            // Add
            .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.items.push(action.payload);
            })
            // Delete
            .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
                state.items = state.items.filter((todo) => todo.id !== action.payload);
            })
            // ✅ Update
            .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                const index = state.items.findIndex((t) => t.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            });
    },
});

export default todosSlice.reducer;
