import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL);
            setTasks(response.data);
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (task) => {
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL, task);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error("Erro ao adicionar tarefa:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error("Erro ao excluir tarefa:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, loading, addTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);