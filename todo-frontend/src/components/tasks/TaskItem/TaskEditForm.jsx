// src/components/tasks/TaskItem/TaskEditForm.jsx
import { Grid, TextField, Button, IconButton, CircularProgress } from '@mui/material';
import { Close } from '@mui/icons-material';
import PropTypes from 'prop-types';

const TaskEditForm = ({ editingTask, onChange, onSave, onCancel, isSaving }) => {
    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
                <TextField
                    name="title"
                    value={editingTask.title}
                    onChange={onChange}
                    fullWidth
                    label="Título"
                    margin="dense"
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    name="dueDate"
                    type="datetime-local"
                    value={editingTask.dueDate}
                    onChange={onChange}
                    fullWidth
                    label="Data e Hora de Vencimento"
                    margin="dense"
                />
            </Grid>
            <Grid item xs={12} sm={2}>
                <Button
                    onClick={onSave}
                    color="primary"
                    disabled={isSaving}
                    fullWidth
                >
                    {isSaving ? <CircularProgress size={24} /> : 'Salvar'}
                </Button>
                <IconButton
                    edge="end"
                    onClick={onCancel}
                    color="secondary"
                    aria-label="Cancelar edição"
                >
                    <Close />
                </IconButton>
            </Grid>
        </Grid>
    );
};

TaskEditForm.propTypes = {
    editingTask: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string.isRequired,
        dueDate: PropTypes.string.isRequired
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isSaving: PropTypes.bool.isRequired
};

export default TaskEditForm;