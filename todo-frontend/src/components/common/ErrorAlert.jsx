import { Snackbar, Alert } from '@mui/material';
import PropTypes from 'prop-types';

const ErrorAlert = ({ error, onClose }) => {
    return (
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Snackbar>
    );
};

ErrorAlert.propTypes = {
    error: PropTypes.string,
    onClose: PropTypes.func.isRequired
};

export default ErrorAlert;