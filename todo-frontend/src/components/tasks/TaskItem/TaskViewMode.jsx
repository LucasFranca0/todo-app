import React from 'react';
import { IconButton, ListItemText, Box, Typography, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDisplayDate } from '../../../utils/dateUtils';
import PropTypes from 'prop-types';

const TaskViewMode = ({ task, onEdit, onDelete, isDeleting = false }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <ListItemText
                primary={
                    <Typography
                        variant="body1"
                        sx={{
                            textDecoration: task.completed ? 'line-through' : 'none',
                            color: task.completed ? 'text.secondary' : 'text.primary',
                        }}
                    >
                        {task.title}
                    </Typography>
                }
                secondary={formatDisplayDate(task.dueDate)}
            />

            <Box>
                <IconButton
                    size="small"
                    onClick={onEdit}
                    disabled={isDeleting}
                    aria-label="Editar tarefa">
                    <EditIcon fontSize="small" />
                </IconButton>

                {isDeleting ? (
                    <CircularProgress size={24} sx={{ ml: 1 }} />
                ) : (
                    <IconButton
                        size="small"
                        onClick={onDelete}
                        color="error"
                        aria-label="Excluir tarefa">
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
};

TaskViewMode.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        dueDate: PropTypes.string.isRequired,
        completed: PropTypes.bool
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    isDeleting: PropTypes.bool
};

export default TaskViewMode;