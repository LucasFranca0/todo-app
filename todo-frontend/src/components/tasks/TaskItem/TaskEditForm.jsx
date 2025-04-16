import {Grid, TextField, Button, IconButton, CircularProgress} from '@mui/material';
import {Close} from '@mui/icons-material';
import PropTypes from 'prop-types';

const TaskEditForm = ({editingTask, onChange, onSave, onCancel, isSaving}) => {
    const getMinDateTime = () => {
        // Configurações para o fuso horário de São Paulo
        const options = {
            timeZone: 'America/Sao_Paulo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };

        // Formatador para o fuso horário específico
        const formatter = new Intl.DateTimeFormat('pt-BR', options);
        const parts = formatter.formatToParts(new Date());

        // Extrair componentes da data formatada
        const year = parts.find(p => p.type === 'year').value;
        const month = parts.find(p => p.type === 'month').value;
        const day = parts.find(p => p.type === 'day').value;
        const hour = parts.find(p => p.type === 'hour').value.padStart(2, '0');
        const minute = parts.find(p => p.type === 'minute').value.padStart(2, '0');

        return `${year}-${month}-${day}T${hour}:${minute}`;
    };
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
                    inputProps={{
                        min: getMinDateTime(),
                        step: 300 // Define intervalos de 5 minutos (300 segundos)
                    }}
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
                    sx={{ mb: 1 }}
                >
                    {isSaving ? <CircularProgress size={24}/> : 'Salvar'}
                </Button>
                <IconButton
                    edge="end"
                    onClick={onCancel}
                    color="secondary"
                    aria-label="Cancelar edição"
                    sx={{ display: 'block', mx: 'auto' }}
                >
                    <Close/>
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