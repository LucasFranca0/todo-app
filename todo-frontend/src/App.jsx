import React, { useState } from 'react';
import { Container, Paper, Typography, Snackbar, Alert, Box } from '@mui/material';
import { TaskProvider } from './contexts/TaskContext';
import TaskList from './components/tasks/TaskList';
import TaskForm from './components/tasks/TaskForm';

const App = () => {
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleTaskAdded = () => {
        setSuccessModalOpen(true);
    };

    const handleTaskError = (message) => {
        setErrorMessage(message);
        setErrorModalOpen(true);
    };

    const handleCloseErrorModal = () => {
        setErrorModalOpen(false);
    };

    const handleCloseSuccessModal = () => {
        setSuccessModalOpen(false);
    };

    return (
        <TaskProvider>
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        mb: 3,
                        backgroundColor: 'background.paper',
                        borderRadius: 2
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        align="center"
                        sx={{ mb: 3, fontWeight: 'bold' }}
                    >
                        Todo List
                    </Typography>

                    <Box sx={{ mb: 4 }}>
                        <TaskForm
                            onTaskAdded={handleTaskAdded}
                            onError={handleTaskError}
                        />
                    </Box>

                    <TaskList />
                </Paper>

                <Snackbar
                    open={successModalOpen}
                    autoHideDuration={4000}
                    onClose={handleCloseSuccessModal}
                >
                    <Alert
                        onClose={handleCloseSuccessModal}
                        severity="success"
                        sx={{ width: '100%' }}
                    >
                        Tarefa adicionada com sucesso!
                    </Alert>
                </Snackbar>

                <Snackbar
                    open={errorModalOpen}
                    autoHideDuration={6000}
                    onClose={handleCloseErrorModal}
                >
                    <Alert
                        onClose={handleCloseErrorModal}
                        severity="error"
                        sx={{ width: '100%' }}
                    >
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </TaskProvider>
    );
};

export default App;