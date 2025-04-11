import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import taskReducer, { initialState, actionTypes } from './TaskReducer';
import * as taskService from '../../services/taskService';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    const fetchTasks = useCallback(async () => {
        try {
            const tasks = await taskService.fetchAllTasks();
            dispatch({ type: actionTypes.FETCH_TASKS_SUCCESS, payload: tasks });
        } catch (error) {
            dispatch({ type: actionTypes.FETCH_TASKS_ERROR, payload: error.message });
        }
    }, []);

    const addTask = useCallback(async (task) => {
        try {
            const newTask = await taskService.createTask(task);
            dispatch({ type: actionTypes.ADD_TASK_SUCCESS, payload: newTask });
            return newTask;
        } catch (error) {
            dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
            throw error;
        }
    }, []);

    const updateTask = useCallback(async (id, updatedTask) => {
        try {
            // Otimista: primeiro atualizamos o estado local para resposta imediata na UI
            dispatch({
                type: actionTypes.UPDATE_TASK_SUCCESS,
                payload: { ...updatedTask, id }
            });

            // Depois atualizamos no servidor
            const task = await taskService.updateTaskById(id, updatedTask);

            return task;
        } catch (error) {
            // Em caso de erro, revertemos o estado ou recarregamos as tarefas
            fetchTasks();
            dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
            throw error;
        }
    }, [fetchTasks]);

    const deleteTask = useCallback(async (id) => {
        if (!id) {
            const errorMsg = "ID da tarefa está indefinido";
            dispatch({ type: actionTypes.SET_ERROR, payload: errorMsg });
            throw new Error(errorMsg);
        }
        try {
            await taskService.deleteTaskById(id);
            dispatch({ type: actionTypes.DELETE_TASK_SUCCESS, payload: id });
        } catch (error) {
            dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
            throw error;
        }
    }, []);

    const updateTaskInContext = useCallback((updatedTask) => {
        dispatch({ type: actionTypes.UPDATE_TASK_SUCCESS, payload: updatedTask });
    }, []);

    const completeTask = useCallback(async (id, completed) => {
        try {
            // Atualização otimista
            const taskToUpdate = state.tasks.find(t => t.id === id);
            if (taskToUpdate) {
                dispatch({
                    type: actionTypes.COMPLETE_TASK_SUCCESS,
                    payload: { ...taskToUpdate, completed }
                });
            }

            // Atualização no servidor
            const updatedTask = await taskService.toggleTaskCompletion(id, completed);
            return updatedTask;
        } catch (error) {
            // Em caso de erro, recarregamos as tarefas
            fetchTasks();
            dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
            throw error;
        }
    }, [state.tasks, fetchTasks]);

    const clearError = useCallback(() => {
        dispatch({ type: actionTypes.CLEAR_ERROR });
    }, []);

    // Inicializar dados ao montar o componente
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const value = {
        tasks: state.tasks,
        loading: state.loading,
        error: state.error,
        addTask,
        updateTask,
        deleteTask,
        completeTask,
        updateTaskInContext,
        clearError
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
};

TaskProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks deve ser usado dentro de um TaskProvider');
    }
    return context;
};