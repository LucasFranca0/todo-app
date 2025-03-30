package com.todoapp.dto;

import java.time.LocalDate;

public record TaskResponseDTO(
        String title,
        boolean completed,
        LocalDate dueDate
) {
}
