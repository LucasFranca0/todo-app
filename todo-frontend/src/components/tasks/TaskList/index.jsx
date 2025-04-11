import React, { useMemo } from 'react';
import { useTasks } from '../../../contexts/TaskContext';
import { List, Paper, Typography, Divider, CircularProgress } from '@mui/material';
import TaskItem from '../TaskItem';
import ErrorAlert from '../../common/ErrorAlert';
import useTaskForm from '../../../hooks/useTaskForm';
import { sortTasksByDueDate } from '../../../utils/dateUtils';

const TaskList = () => {
    const { tasks, loading, error: contextError, clearError } = useTasks();
    const {
        editingTask,
        isSaving,
        error: formError,
        handleEditClick,
        handleInputChange,
        handleSaveClick,
        resetForm: handleCancelEdit,
        clearError: clearFormError
    } = useTaskForm();

    // Memoização da ordenação e agrupamento das tarefas para otimizar performance
    const groupedTasks = useMemo(() => {
        const sorted = sortTasksByDueDate(tasks);
        return {
            notCompleted: sorted.filter(task => !task.completed),
            completed: sorted.filter(task => task.completed)
        };
    }, [tasks]);

    if (loading) {
        return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />;
    }

    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Lista de Tarefas
            </Typography>

            {groupedTasks.notCompleted.length > 0 && (
                <>
                    <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                        Pendentes
                    </Typography>
                    <List>
                        {groupedTasks.notCompleted.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                isEditing={editingTask.id === task.id}
                                editingTask={editingTask}
                                onInputChange={handleInputChange}
                                onSaveClick={handleSaveClick}
                                onCancelEdit={handleCancelEdit}
                                onEditClick={handleEditClick} // Nenhuma mudança necessária aqui
                                isSaving={isSaving}
                            />
                        ))}
                    </List>
                </>
            )}

            {groupedTasks.completed.length > 0 && (
                <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                        Concluídas
                    </Typography>
                    <List>
                        {groupedTasks.completed.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                isEditing={editingTask.id === task.id}
                                editingTask={editingTask}
                                onInputChange={handleInputChange}
                                onSaveClick={handleSaveClick}
                                onCancelEdit={handleCancelEdit}
                                onEditClick={handleEditClick}
                                isSaving={isSaving}
                            />
                        ))}
                    </List>
                </>
            )}

            {tasks.length === 0 && (
                <Typography variant="body1" sx={{ textAlign: 'center', my: 3, color: 'text.secondary' }}>
                    Nenhuma tarefa encontrada. Adicione uma nova!
                </Typography>
            )}

            <ErrorAlert error={contextError} onClose={clearError} />
            <ErrorAlert error={formError} onClose={clearFormError} />
        </Paper>
    );
};

export default TaskList;