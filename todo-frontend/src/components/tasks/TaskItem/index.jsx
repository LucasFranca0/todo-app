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

    const handleSaveWithValidation = useCallback(async () => {
        // Obter data atual em São Paulo
        const getSPTime = () => {
            const options = { timeZone: 'America/Sao_Paulo' };
            return new Date(new Date().toLocaleString('pt-BR', options));
        };

        // Converter data selecionada para o fuso de SP
        const selectedDate = new Date(editingTask.dueDate);
        const spSelectedDate = new Date(selectedDate.toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo'
        }));

        // Comparação com horário atual de SP
        if (spSelectedDate < getSPTime()) {
            setError('Não é permitido definir datas/horários passados');
            return;
        }

        if (editingTask.title.trim().length < 3) {
            setError('O título deve ter pelo menos 3 caracteres');
            return;
        }

        onSaveClick();
    }, [editingTask, onSaveClick]);

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
            <Paper elevation={1} sx={{
                marginBottom: 1,
                opacity: task.completed ? 0.6 : 1,
                transition: 'opacity 0.3s ease'
            }}>
                <ListItem sx={{
                    position: 'relative',
                    bgcolor: task.completed ? 'action.selected' : 'background.paper'
                }}>
                    <Checkbox
                        checked={!!task.completed}
                        onChange={handleComplete}
                        disabled={isCompleting || isDeleting || isEditing}
                        color="primary"
                        sx={{
                            '&.Mui-disabled': {
                                color: 'text.disabled'
                            }
                        }}
                    />

                    {isEditing ? (
                        <TaskEditForm
                            editingTask={editingTask}
                            onChange={onInputChange}
                            onSave={handleSaveWithValidation}  // Usa a validação reforçada
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

            <ErrorAlert error={error} onClose={() => setError(null)} />
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