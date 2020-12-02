import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { ReadTask, PostTask, TaskState, User, Category } from "../types";

export const fetchAsyncGetTasks = createAsyncThunk("task/getTask", async () => {
    const res = await axios.get<ReadTask[]>(
        `${process.env.REACT_APP_API_URL}/api/tasks/`,
        {
            headers: {
                Authorization: `JWT ${localStorage.localJWT}`,
            },
        }
    );
    return res.data;
});

export const fetchAsyncGetUsers = createAsyncThunk(
    "task/getUsers",
    async () => {
        const res = await axios.get<User[]>(
            `${process.env.REACT_APP_API_URL}/api/users/`,
            {
                headers: {
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            }
        );
        return res.data;
    }
);

export const fetchAsyncGetCategory = createAsyncThunk(
    "task/getCategory",
    async () => {
        const res = await axios.get<Category[]>(
            `${process.env.REACT_APP_API_URL}/api/category/`,
            {
                headers: {
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            }
        );
        return res.data;
    }
);

export const fetchAsyncCreateCategory = createAsyncThunk(
    "task/createCategory",
    async (item: string) => {
        const res = await axios.post<Category>(
            `${process.env.REACT_APP_API_URL}/api/category/`,
            { item: item },
            {
                headers: {
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            }
        );
        return res.data;
    }
);

export const fetchAsyncCreateTask = createAsyncThunk(
    "task/createTask",
    async (task: PostTask) => {
        const res = await axios.post<ReadTask>(
            `${process.env.REACT_APP_API_URL}/api/tasks/`,
            task,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            }
        );
        return res.data;
    }
);

export const fetchAsyncUpdateTask = createAsyncThunk(
    "task/updateTask",
    async (task: PostTask) => {
        const res = await axios.put<ReadTask>(
            `${process.env.REACT_APP_API_URL}/api/tasks/${task.id}/`,
            task,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            }
        );
        return res.data;
    }
);

export const fetchAsyncDeleteTask = createAsyncThunk(
    "task/deleteTask",
    async (id: number) => {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/tasks/${id}/`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${localStorage.localJWT}`,
            },
        });
        return id;
    }
);

export const initialState: TaskState = {
    tasks: [
        {
            id: 0,
            task: "",
            description: "",
            criteria: "",
            owner: 0,
            owner_username: "",
            responsible: 0,
            responsible_username: "",
            estimate: 0,
            category: 0,
            category_item: "",
            status: "",
            status_name: "",
            created_at: "",
            updated_at: "",
        },
    ],
    editedTask: {
        id: 0,
        task: "",
        description: "",
        criteria: "",
        responsible: 0,
        estimate: 0,
        category: 0,
        status: "",
    },
    selectedTask: {
        id: 0,
        task: "",
        description: "",
        criteria: "",
        owner: 0,
        owner_username: "",
        responsible: 0,
        responsible_username: "",
        estimate: 0,
        category: 0,
        category_item: "",
        status: "",
        status_name: "",
        created_at: "",
        updated_at: "",
    },
    users: [
        {
            id: 0,
            username: "",
        },
    ],
    categories: [
        {
            id: 0,
            item: "",
        },
    ],
};

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        editTask(state, action: PayloadAction<PostTask>) {
            state.editedTask = action.payload;
        },
        selectTask(state, action: PayloadAction<ReadTask>) {
            state.selectedTask = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchAsyncGetTasks.fulfilled,
            (state, action: PayloadAction<ReadTask[]>) => {
                return {
                    ...state,
                    tasks: action.payload,
                };
            }
        );
        builder.addCase(fetchAsyncGetTasks.rejected, () => {
            window.location.href = "/";
        });
        builder.addCase(
            fetchAsyncGetUsers.fulfilled,
            (state, action: PayloadAction<User[]>) => {
                return {
                    ...state,
                    users: action.payload,
                };
            }
        );
        builder.addCase(
            fetchAsyncGetCategory.fulfilled,
            (state, action: PayloadAction<Category[]>) => {
                return {
                    ...state,
                    category: action.payload,
                };
            }
        );
        builder.addCase(
            fetchAsyncCreateCategory.fulfilled,
            (state, action: PayloadAction<Category>) => {
                return {
                    ...state,
                    category: [...state.categories, action.payload],
                };
            }
        );
        builder.addCase(fetchAsyncCreateCategory.rejected, () => {
            window.location.href = "/";
        });
        builder.addCase(
            fetchAsyncCreateTask.fulfilled,
            (state, action: PayloadAction<ReadTask>) => {
                return {
                    ...state,
                    tasks: [action.payload, ...state.tasks],
                    editedTask: initialState.editedTask,
                };
            }
        );
        builder.addCase(fetchAsyncCreateTask.rejected, () => {
            window.location.href = "/";
        });
        builder.addCase(
            fetchAsyncUpdateTask.fulfilled,
            (state, action: PayloadAction<ReadTask>) => {
                return {
                    ...state,
                    tasks: state.tasks.map((t) =>
                        t.id === action.payload.id ? action.payload : t
                    ),
                    editedTask: initialState.editedTask,
                    selectedTask: initialState.selectedTask,
                };
            }
        );
        builder.addCase(fetchAsyncUpdateTask.rejected, () => {
            window.location.href = "/";
        });
        builder.addCase(
            fetchAsyncDeleteTask.fulfilled,
            (state, action: PayloadAction<number>) => {
                return {
                    ...state,
                    tasks: state.tasks.filter((t) => t.id !== action.payload),
                    editedTask: initialState.editedTask,
                    selectedTask: initialState.selectedTask,
                };
            }
        );
        builder.addCase(fetchAsyncDeleteTask.rejected, () => {
            window.location.href = "/";
        });
    },
});

export const { editTask, selectTask } = taskSlice.actions;
export const selectSelectedTask = (state: RootState) => state.task.selectedTask;
export const selectEditedTask = (state: RootState) => state.task.editedTask;
export const selectTasks = (state: RootState) => state.task.tasks;
export const selectUsers = (state: RootState) => state.task.users;
export const selectCategory = (state: RootState) => state.task.categories;
export default taskSlice.reducer;