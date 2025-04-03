import { useState } from 'react';
import { useTasks } from '../contexts/TaskContext';
import { Button, TextField, Stack, Paper, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';

const TaskForm = ({ onTaskAdded, onTaskError }) => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const { addTask } = useTasks();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (dueDate < new Date()) {
            alert("A data e hora não podem ser anteriores ao momento atual.");
            return;
        }
        addTask({
            title,
            dueDate: dueDate.toISOString()
        });
        setTitle('');
        setDueDate(new Date());
        onTaskAdded();
    };

    return (
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6" gutterBottom>
                Adicionar Nova Tarefa
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Título da Tarefa"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        fullWidth
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
                        <DateTimePicker
                            label="Data de Vencimento"
                            value={dueDate}
                            onChange={(date) => setDueDate(date)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                            minDateTime={new Date()}
                        />
                    </LocalizationProvider>

                    <Button type="submit" variant="contained" color="primary">
                        Adicionar Tarefa
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
};

export default TaskForm;