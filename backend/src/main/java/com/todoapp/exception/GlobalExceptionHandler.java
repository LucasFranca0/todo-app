package com.todoapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        ErrorResponse error = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                "Erro de validação",
                ex.getBindingResult().getFieldErrors().stream()
                        .map(err -> new ValidationError(
                                err.getField(),
                                err.getDefaultMessage()
                        ))
                        .toList()
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    public record ErrorResponse(
            int status,
            String message,
            List<ValidationError> errors) {
    }

    public record ValidationError(
            String field,
            String message) {
    }

}
