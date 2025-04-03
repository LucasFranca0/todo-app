// src/components/TaskList.jsx
import React, { useState } from 'react';
import { useTasks } from '../contexts/TaskContext';
import { List, Paper, Typography, TextField, Button, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const TaskList = () => {
    const { tasks, loading, updateTask, completeTask } = useTasks();
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [newTitle, setNewTitle] = useState('');

    const handleEditClick = (task) => {
        setEditingTaskId(task.id);
        setNewTitle(task.title);
    };

    const handleSaveClick = (id) => {
        updateTask(id, { title: newTitle });
        setEditingTaskId(null);
        setNewTitle('');
    };

    const handleCompleteChange = (id, completed) => {
        completeTask(id, completed);
    };

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
                    <ListItem key={task.id}>
                        <Checkbox
                            checked={task.completed}
                            onChange={(e) => handleCompleteChange(task.id, e.target.checked)}
                        />
                        {editingTaskId === task.id ? (
                            <TextField
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                fullWidth
                            />
                        ) : (
                            <ListItemText
                                primary={task.title}
                                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                            />
                        )}
                        <ListItemSecondaryAction>
                            {editingTaskId === task.id ? (
                                <Button onClick={() => handleSaveClick(task.id)} color="primary">
                                    Salvar
                                </Button>
                            ) : (
                                <IconButton edge="end" onClick={() => handleEditClick(task)}>
                                    <EditIcon />
                                </IconButton>
                            )}
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default TaskList;