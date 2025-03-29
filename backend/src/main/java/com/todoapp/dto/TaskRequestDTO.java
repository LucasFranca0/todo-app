package com.todoapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record TaskRequestDTO(
        @NotBlank(message = "O título é obrigatório")
        String title,

        @NotNull(message = "A data de vencimento é obrigatória")
        LocalDate dueDate
) {
}