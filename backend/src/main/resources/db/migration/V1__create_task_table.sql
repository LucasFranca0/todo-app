CREATE TABLE tasks (
                       id BIGSERIAL PRIMARY KEY,  -- Alterado de SERIAL para BIGSERIAL
                       title VARCHAR(255) NOT NULL,
                       completed BOOLEAN DEFAULT false,
                       due_date DATE
);