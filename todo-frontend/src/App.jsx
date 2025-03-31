import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { TaskProvider } from './contexts/TaskContext';
import { Container, CssBaseline } from '@mui/material';

const App = () => {
  return (
      <TaskProvider>
        <CssBaseline />
        <Container maxWidth="md">
          <h1>Todo App</h1>
          <TaskForm />
          <TaskList />
        </Container>
      </TaskProvider>
  );
};

export default App;