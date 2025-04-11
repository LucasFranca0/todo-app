import React, { useState, useCallback } from 'react';
import { useTasks } from '../../../contexts/TaskContext';
import { Checkbox, ListItem, Paper } from '@mui/material';
import TaskViewMode from './TaskViewMode';
import TaskEditForm from './TaskEditForm';
import ErrorAlert from '../../common/ErrorAlert';
import PropTypes from 'prop-types';

const TaskItem = ({
                      task,
                      isEditing,
                      editingTask,
                      onEditClick,
                      onInputChange,
                      onSaveClick,
                      onCancelEdit,
                      isSaving
                  }) => {
    const { deleteTask, completeTask } = useTasks();
    const [isCompleting, setIsCompleting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    // Função segura para completar tarefas
    const handleComplete = useCallback(async () => {
        if (isCompleting || !task?.id) return;

        setIsCompleting(true);
        try {
            await completeTask(task.id, !task.completed);
        } catch (err) {
            setError(`Erro ao ${task.completed ? 'desmarcar' : 'completar'} tarefa: ${err.message}`);
        } finally {
            setIsCompleting(false);
        }
    }, [completeTask, isCompleting, task]);

    // Função segura para excluir tarefas
    const handleDelete = useCallback(async () => {
        if (isDeleting || !task?.id) return;

        setIsDeleting(true);
        try {
            await deleteTask(task.id);
        } catch (err) {
            setError(`Erro ao excluir tarefa: ${err.message}`);
        } finally {
            setIsDeleting(false);
        }
    }, [deleteTask, isDeleting, task]);

    const handleCloseError = () => setError(null);

    // Verificação de segurança para garantir que a tarefa existe
    if (!task) {
        return null;
    }

    return (
        <>
            <Paper elevation={1} sx={{ marginBottom: 1 }}>
                <ListItem>
                    <Checkbox
                        checked={!!task.completed}
                        onChange={handleComplete}
                        disabled={isCompleting || isDeleting || isEditing}
                        color="primary"
                        aria-label={task.completed ? "Marcar como não concluída" : "Marcar como concluída"}
                    />

                    {isEditing ? (
                        <TaskEditForm
                            editingTask={editingTask}
                            onChange={onInputChange}
                            onSave={onSaveClick}
                            onCancel={onCancelEdit}
                            isSaving={isSaving}
                        />
                    ) : (
                        <TaskViewMode
                            task={task}
                            onEdit={() => task?.id && onEditClick(task)}
                            onDelete={handleDelete}
                            isDeleting={isDeleting}
                        />
                    )}
                </ListItem>
            </Paper>

            <ErrorAlert error={error} onClose={handleCloseError} />
        </>
    );
};

TaskItem.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        dueDate: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired,
    isEditing: PropTypes.bool.isRequired,
    editingTask: PropTypes.object,
    onEditClick: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onSaveClick: PropTypes.func.isRequired,
    onCancelEdit: PropTypes.func.isRequired,
    isSaving: PropTypes.bool.isRequired
};

export default TaskItem;