package com.todoapp.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public record TaskRequestDTO(
        @NotBlank(message = "O título é obrigatório")
        String title,

        @FutureOrPresent(message = "A data de vencimento deve ser no futuro ou presente")
        @NotNull(message = "A data de vencimento é obrigatória")
        LocalDateTime dueDate
) {
}