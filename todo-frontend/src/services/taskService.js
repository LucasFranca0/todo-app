// src/services/taskService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchAllTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error(`Erro ao buscar tarefas: ${error.message}`);
    }
};

export const createTask = async (task) => {
    try {
        const response = await axios.post(API_URL, task);
        return response.data;
    } catch (error) {
        throw new Error(`Erro ao adicionar tarefa: ${error.message}`);
    }
};

export const updateTaskById = async (id, updatedTask) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedTask);
        return response.data;
    } catch (error) {
        throw new Error(`Erro ao atualizar tarefa: ${error.message}`);
    }
};

export const deleteTaskById = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    } catch (error) {
        throw new Error(`Erro ao excluir tarefa: ${error.message}`);
    }
};

export const toggleTaskCompletion = async (id, completed) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}/complete`, { completed });
        return response.data;
    } catch (error) {
        throw new Error(`Erro ao ${completed ? 'completar' : 'desmarcar'} tarefa: ${error.message}`);
    }
};