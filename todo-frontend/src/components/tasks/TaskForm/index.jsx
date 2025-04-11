// src/components/tasks/TaskForm/index.jsx
import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Paper } from '@mui/material';
import { useTasks } from '../../../contexts/TaskContext';
import PropTypes from 'prop-types';

const TaskForm = ({ onTaskAdded, onError }) => {
    const { addTask } = useTasks();
    const [newTask, setNewTask] = useState({
        title: '',
        dueDate: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação
        if (!newTask.title.trim()) {
            onError("O título da tarefa não pode estar vazio");
            return;
        }

        if (!newTask.dueDate) {
            onError("A data de vencimento é obrigatória");
            return;
        }

        setIsSubmitting(true);
        try {
            await addTask({
                ...newTask,
                completed: false
            });

            // Limpar formulário
            setNewTask({
                title: '',
                dueDate: ''
            });

            // Notificar sucesso
            onTaskAdded();
        } catch (error) {
            onError(`Erro ao adicionar tarefa: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Paper elevation={1} sx={{ p: 2 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={5}>
                        <TextField
                            name="title"
                            label="Nova Tarefa"
                            value={newTask.title}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            disabled={isSubmitting}
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <TextField
                            name="dueDate"
                            type="datetime-local"
                            label="Data de Vencimento"
                            value={newTask.dueDate}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            InputLabelProps={{ shrink: true }}
                            disabled={isSubmitting}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isSubmitting}
                        >
                            Adicionar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

TaskForm.propTypes = {
    onTaskAdded: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
};

export default TaskForm;