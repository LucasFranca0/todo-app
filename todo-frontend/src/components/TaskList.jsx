import { useTasks } from '../contexts/TaskContext';
import TaskItem from './TaskItem';
import { CircularProgress, List, Typography } from '@mui/material';

const TaskList = () => {
    const { tasks, loading } = useTasks();

    if (loading) return <CircularProgress />;

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Minhas Tarefas
            </Typography>
            <List>
                {tasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </List>
        </div>
    );
};

export default TaskList;