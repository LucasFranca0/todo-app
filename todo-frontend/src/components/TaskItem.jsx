import { Delete } from '@mui/icons-material';
import { IconButton, ListItem, ListItemText, Checkbox } from '@mui/material';
import { useTasks } from '../contexts/TaskContext';

const TaskItem = ({ task }) => {
    const { deleteTask } = useTasks();

    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" onClick={() => deleteTask(task.id)}>
                    <Delete />
                </IconButton>
            }
        >
            <Checkbox checked={task.completed} />
            <ListItemText
                primary={task.title}
                secondary={`Vence em: ${new Date(task.dueDate).toLocaleDateString()}`}
            />
        </ListItem>
    );
};

export default TaskItem;