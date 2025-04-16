ALTER DATABASE todo_db SET timezone TO 'America/Sao_Paulo';
CREATE TABLE tasks (
                       id BIGSERIAL PRIMARY KEY,
                       title VARCHAR(255) NOT NULL,
                       completed BOOLEAN NOT NULL DEFAULT false,
                       due_date TIMESTAMP WITH TIME ZONE NOT NULL
);