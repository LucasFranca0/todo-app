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
        onError(null);
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação
        const getSPTime = () => {
            return new Date(new Date().toLocaleString('en-US', {
                timeZone: 'America/Sao_Paulo'
            }));
        };

        const selectedDate = new Date(newTask.dueDate);
        if (selectedDate < getSPTime()) {
            onError("Não é permitido agendar para datas/horários passados (Horário de SP)");
            return;
        }

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

    const getMinDateTime = () => {
        // Configurações para o fuso horário de São Paulo
        const options = {
            timeZone: 'America/Sao_Paulo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };

        // Formatador para o fuso horário específico
        const formatter = new Intl.DateTimeFormat('pt-BR', options);
        const parts = formatter.formatToParts(new Date());

        // Extrair componentes da data formatada
        const year = parts.find(p => p.type === 'year').value;
        const month = parts.find(p => p.type === 'month').value;
        const day = parts.find(p => p.type === 'day').value;
        const hour = parts.find(p => p.type === 'hour').value.padStart(2, '0');
        const minute = parts.find(p => p.type === 'minute').value.padStart(2, '0');

        return `${year}-${month}-${day}T${hour}:${minute}`;
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
                            inputProps={{ min: getMinDateTime()}} // Bloqueia datas e horários anteriores ao atual
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