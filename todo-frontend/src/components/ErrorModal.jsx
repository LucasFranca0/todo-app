import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const ErrorModal = ({ open, handleClose, errorMessage }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Erro</DialogTitle>
            <DialogContent>
                <p>{errorMessage}</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ErrorModal;