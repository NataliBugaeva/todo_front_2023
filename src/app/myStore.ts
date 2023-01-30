import {Action, configureStore, createAction, ThunkAction} from "@reduxjs/toolkit";
import todosReducer from '../features/todos/todoSlice';
import tasksReducer from '../features/tasks/tasksSlice';

// const preloadState = {
//     todos: [{id: 1, name: 'todo1', todosFilter: 'all'}, {id: 1, name: 'todo2', todosFilter: 'active'}, {
//         id: 1,
//         name: 'todo3',
//         todosFilter: 'complited'
//     }],
//     tasks: {
//         [1]: [{id: 1, name: 'task1', isDone: false}, {id: 2, name: 'task2', isDone: false}, {
//             id: 3,
//             name: 'task3',
//             isDone: false
//         },],
//         [2]: [{id: 4, name: 'task4', isDone: false}, {id: 5, name: 'task5', isDone: false}, {
//             id: 6,
//             name: 'task6',
//             isDone: false
//         },],
//         [3]: [{id: 7, name: 'task7', isDone: false}, {id: 8, name: 'task8', isDone: false}, {
//             id: 9,
//             name: 'task9',
//             isDone: false
//         },],
//     }
// }

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        tasks: tasksReducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;



// const action = createAction("test_action_1");
// console.log(action(1))
