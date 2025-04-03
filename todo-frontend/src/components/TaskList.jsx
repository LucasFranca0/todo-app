import { useTasks } from '../contexts/TaskContext';
import TaskItem from './TaskItem';
import { List, Paper, Typography } from '@mui/material';

const TaskList = () => {
    const { tasks, loading } = useTasks();

    if (loading) {
        return <Typography>Carregando...</Typography>;
    }

    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Lista de Tarefas
            </Typography>
            <List>
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </List>
        </Paper>
    );
};

export default TaskList;