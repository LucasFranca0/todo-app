package com.todoapp.exceptions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.todoapp.dto.TaskRequestDTO;
import com.todoapp.exception.GlobalExceptionHandler;
import com.todoapp.exception.TaskNotFoundException;
import com.todoapp.service.TaskService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
@Import(GlobalExceptionHandler.class)
public class GlobalExceptionHandlerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TaskService taskService; // Injeta o mock configurado manualmente

    @Autowired
    private ObjectMapper objectMapper;

    // Configuração do mock para substituir o @MockBean
    @TestConfiguration
    static class TestConfig {
        @Bean
        public TaskService taskService() {
            return Mockito.mock(TaskService.class); // Cria o mock manualmente
        }
    }

    @Test
    void shouldReturnInternalServerError() throws Exception {
        mockMvc.perform(post("/api/1"))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.status").value(500))
                .andExpect(jsonPath("$.message").value("Ocorreu um erro interno. Por favor, tente novamente mais tarde."));
    }

    @Test
    void shouldReturnBadRequestAndErrors() throws Exception {
        MvcResult result = mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\": \"\", \"dueDate\": \"2023-12-31T23:59\"}"))
                .andReturn();

        String jsonResponse = result.getResponse().getContentAsString();
        assertThat(jsonResponse).isNotEmpty();
        assertThat(jsonResponse).contains("\"status\":400");
        assertThat(jsonResponse).contains("\"message\":\"Erro de validação\"");
        assertThat(jsonResponse).contains("\"title\":\"O título é obrigatório\"");
        assertThat(jsonResponse).contains("\"dueDate\":\"A data de vencimento deve ser no futuro ou presente\"");
    }

    @Test
    void shouldReturnNotFound() throws Exception {
        Mockito.when(taskService.getTaskById(1L)).thenThrow(new TaskNotFoundException(1L));

        mockMvc.perform(get("/api/tasks/1"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.message").value("Tarefa não encontrada com ID: 1"));
    }

    @Test
    void shouldReturnBadRequestForMethodArgumentNotValidException() throws Exception {
        TaskRequestDTO taskRequestDTO = new TaskRequestDTO("", LocalDateTime.of(2023, 12, 31, 23, 59));

        MvcResult result = mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(taskRequestDTO)))
                .andExpect(status().isBadRequest())
                .andReturn();


        String jsonResponse = result.getResponse().getContentAsString();
        assertThat(jsonResponse).contains("\"status\":400");
        assertThat(jsonResponse).contains("\"message\":\"Erro de validação\"");
    }
}
