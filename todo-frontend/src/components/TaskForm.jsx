import { useState } from 'react';
import { useTasks } from '../contexts/TaskContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, TextField, Stack } from '@mui/material';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const { addTask } = useTasks();

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({
            title,
            dueDate: dueDate.toISOString()
        });
        setTitle('');
        setDueDate(new Date());
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    label="Título da Tarefa"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <DatePicker
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy HH:mm"
                    minDate={new Date()}
                />

                <Button type="submit" variant="contained">
                    Adicionar Tarefa
                </Button>
            </Stack>
        </form>
    );
};

export default TaskForm;