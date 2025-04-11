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

        setIsSaving(true);
        try {
            // Preparar a tarefa com a data no formato correto
            const taskToUpdate = {
                ...editingTask,
                // Usar a função para preservar o fuso horário
                dueDate: toServerDateTime(editingTask.dueDate)
            };

            // Enviar para o servidor e atualizar o contexto
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