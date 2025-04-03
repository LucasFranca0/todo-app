import React, {useState} from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import {TaskProvider} from './contexts/TaskContext';
import {Container, CssBaseline} from '@mui/material';
import SuccessModal from './components/SuccessModal';
import ErrorModal from './components/ErrorModal';

const App = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleTaskAdded = () => {
        setModalOpen(true);
    };

    const handleTaskError = (message) => {
        setErrorMessage(message);
        setErrorModalOpen(true);
    };

    const handleCloseErrorModal = () => {
        setErrorModalOpen(false);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <TaskProvider>
            <CssBaseline/>
            <Container maxWidth="md">
                <h1>Todo App</h1>
                <TaskForm onTaskAdded={handleTaskAdded} onTaskError={handleTaskError}/>
                <TaskList/>
                <SuccessModal open={modalOpen} handleClose={handleCloseModal}/>
                <ErrorModal open={errorModalOpen} handleClose={handleCloseErrorModal} errorMessage={errorMessage} />
            </Container>
        </TaskProvider>
    );
};

export default App;