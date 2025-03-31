package com.todoapp.dto;

import java.time.LocalDateTime;

public record TaskResponseDTO(
        String title,
        boolean completed,
        LocalDateTime dueDate
) {
}
