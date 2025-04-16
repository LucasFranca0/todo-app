// src/hooks/useTaskForm.js
import {useState} from 'react';
import {useTasks} from '../contexts/TaskContext';
import {formatToInputDateTime, toServerDateTime} from '../utils/dateUtils';

export default function useTaskForm() {
    const {updateTask} = useTasks();
    const [editingTask, setEditingTask] = useState({id: null, title: '', dueDate: ''});
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const handleSaveClick = async () => {
        if (!editingTask.title.trim()) {
            setError("O título da tarefa não pode estar vazio");
            return;
        }

        const getSPTime = () => {
            return new Date(new Date().toLocaleString('en-US', {
                timeZone: 'America/Sao_Paulo'
            }));
        };

        const selectedDate = new Date(editingTask.dueDate);
        if (!editingTask.dueDate || selectedDate < getSPTime()) {
           setError("A data de vencimento não pode ser anterior à data atual");
            return;
        }

        setIsSaving(true);
        try {
            const taskToUpdate = {
                ...editingTask,
                dueDate: toServerDateTime(editingTask.dueDate)
            };

            await updateTask(taskToUpdate.id, taskToUpdate);
            resetForm();
        } catch (err) {
            setError(`Erro ao salvar tarefa: ${err.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleEditClick = (task) => {
        const formattedDateTime = formatToInputDateTime(task.dueDate);
        setEditingTask({id: task.id, title: task.title, dueDate: formattedDateTime});
    };

    const handleInputChange = (e) => {
        setEditingTask({
            ...editingTask,
            [e.target.name]: e.target.value
        });
    };

    const resetForm = () => {
        setEditingTask({id: null, title: '', dueDate: ''});
    };

    const clearError = () => {
        setError(null);
    };

    return {
        editingTask,
        isSaving,
        error,
        handleEditClick,
        handleInputChange,
        handleSaveClick,
        resetForm,
        clearError
    };
}