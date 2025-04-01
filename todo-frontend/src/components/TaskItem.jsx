import { useState } from 'react';
import { useTasks } from '../contexts/TaskContext';
import { Checkbox, IconButton, ListItem, ListItemText, styled } from '@mui/material';
import { Delete } from '@mui/icons-material';

const StyledListItemText = styled(ListItemText)(({ completed }) => ({
    textDecoration: completed ? 'line-through' : 'none',
    color: completed ? '#636060' : 'inherit',
    transition: 'all 0.3s ease'
}));

const TaskItem = ({ task }) => {
    const { deleteTask, completeTask } = useTasks();
    const [isCompleting, setIsCompleting] = useState(false);

    const handleComplete = async () => {
        if (!isCompleting) {
            setIsCompleting(true);
            try {
                if (task && task.id) {
                    await completeTask(task.id, !task.completed);
                } else {
                    console.error("ID da tarefa está indefinido");
                }
            } finally {
                setIsCompleting(false);
            }
        }
    };

    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" onClick={() => deleteTask(task.id)}>
                    <Delete />
                </IconButton>
            }
        >
            <Checkbox
                checked={task.completed}
                onChange={handleComplete}
                disabled={isCompleting}
                color="primary"
            />
            <StyledListItemText
                primary={task.title}
                secondary={`Vence em: ${new Date(task.dueDate).toLocaleString()}`}
                completed={task.completed}
            />
        </ListItem>
    );
};

export default TaskItem;