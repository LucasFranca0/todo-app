import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Azul
        },
        secondary: {
            main: '#dc004e', // Vermelho
        },
        background: {
            default: '#f5f5f5', // Fundo claro
            paper: '#ffffff', // Papel branco
        },
        text: {
            primary: '#000000', // Texto preto
            secondary: '#1976d2', // Texto azul
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif', // Fonte Roboto
    },
});

export default customTheme;