// src/utils/dateUtils.js
export const formatDateTime = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleString('pt-BR');
};

// Função que preserva o horário local para input
export const formatToInputDateTime = (date) => {
    if (!date) return '';
    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Para enviar ao servidor preservando o fuso horário
export const toServerDateTime = (localDate) => {
    if (!localDate) return null;

    // Preservar o horário local explicitamente criando um objeto Date com os valores
    const d = new Date(localDate);

    // Criamos uma string ISO mas adicionamos a informação do fuso horário
    return d.toISOString();
};

export const formatDisplayDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};

export const sortTasksByDueDate = (tasks) => {
    if (!tasks || !Array.isArray(tasks)) return [];
    return [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
};