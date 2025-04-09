package com.todoapp.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.todoapp.dto.TaskRequestDTO;
import com.todoapp.dto.TaskResponseDTO;
import com.todoapp.model.Task;
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

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TaskController.class)
@Import(TaskControllerTest.TestConfig.class) // Importa a configuração do mock
class TaskControllerTest {

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
    void createTask_ShouldReturnCreatedTask() throws Exception {
        TaskRequestDTO request = new TaskRequestDTO("Test Task", LocalDateTime.now().plusDays(1));
        TaskResponseDTO response = new TaskResponseDTO("Test Task", false, LocalDateTime.now().plusDays(2));

        Mockito.when(taskService.createTask(request)).thenReturn(response);

        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Test Task"));
    }

    @Test
    void getAllTasks_ShouldReturnListOfTasks() throws Exception {
        Task task1 = new Task();
        Task task2 = new Task();

        Mockito.when(taskService.getAllTasks()).thenReturn(List.of(task1, task2));

        mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2));
    }

    @Test
    void getTaskById_ShouldReturnTask() throws Exception {
        TaskResponseDTO response = new TaskResponseDTO("Test Task", false, LocalDateTime.now());

        Mockito.when(taskService.getTaskById(1L)).thenReturn(response);

        mockMvc.perform(get("/api/tasks/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Task"));
    }

    @Test
    void deleteTask_ShouldReturnNoContent() throws Exception {
        TaskResponseDTO response = new TaskResponseDTO("Test Task", false, LocalDateTime.now().plusDays(1));
        Mockito.when(taskService.getTaskById(1L)).thenReturn(response);

        Mockito.doNothing().when(taskService).deleteTask(1L);
        mockMvc.perform(delete("/api/tasks/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    void updateTask_ShouldReturnUpdatedTask() throws Exception {
        TaskRequestDTO request = new TaskRequestDTO("Updated Task", LocalDateTime.now().plusDays(1));
        TaskResponseDTO response = new TaskResponseDTO("Updated Task", false, LocalDateTime.now().plusDays(1));

        Mockito.when(taskService.updateTask(1L, request)).thenReturn(response);

        mockMvc.perform(put("/api/tasks/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated Task"));
    }

    @Test
    void completeTask_ShouldReturnCompletedTask() throws Exception {
        Map<String, Boolean> update = new HashMap<>();
        update.put("completed", true);
        TaskResponseDTO response = new TaskResponseDTO("Completed Task", true, LocalDateTime.now().plusDays(1));
        Mockito.when(taskService.updateTaskCompletion(1L, true)).thenReturn(response);
        mockMvc.perform(patch("/api/tasks/1/complete")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(update)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.completed").value(true));
    }
}