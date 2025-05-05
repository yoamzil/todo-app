import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

interface TodosState {
    todos: Todo[];
}

const initialState: TodosState = {
    todos: [],
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Omit<Todo, "completed">>) => {
            const newTodo: Todo = {
                ...action.payload,
                completed: false,
            };
            state.todos.push(newTodo);
        },
        toggleTodo: (state, action: PayloadAction<string>) => {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(
                (todo) => todo.id !== action.payload
            );
        },
    },
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;

export const selectTodos = (state: { todos: TodosState }) => state.todos.todos;

export default todoSlice.reducer;
