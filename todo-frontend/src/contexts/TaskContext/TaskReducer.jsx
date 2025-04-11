export const initialState = {
    tasks: [],
    loading: true,
    error: null
};

export const actionTypes = {
    FETCH_TASKS_SUCCESS: 'FETCH_TASKS_SUCCESS',
    FETCH_TASKS_ERROR: 'FETCH_TASKS_ERROR',
    ADD_TASK_SUCCESS: 'ADD_TASK_SUCCESS',
    UPDATE_TASK_SUCCESS: 'UPDATE_TASK_SUCCESS',
    DELETE_TASK_SUCCESS: 'DELETE_TASK_SUCCESS',
    COMPLETE_TASK_SUCCESS: 'COMPLETE_TASK_SUCCESS',
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR'
};

export default function taskReducer(state, action) {
    switch (action.type) {
        case actionTypes.FETCH_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.payload,
                loading: false
            };
        case actionTypes.FETCH_TASKS_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case actionTypes.ADD_TASK_SUCCESS:
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            };
        case actionTypes.UPDATE_TASK_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id ? action.payload : task
                ),
                loading: false
            };
        case actionTypes.DELETE_TASK_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };
        case actionTypes.COMPLETE_TASK_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id ? action.payload : task
                )
            };
        case actionTypes.SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case actionTypes.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}