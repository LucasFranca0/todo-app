package com.todoapp.service;

import com.todoapp.dto.TaskRequestDTO;
import com.todoapp.dto.TaskResponseDTO;
import com.todoapp.exception.TaskNotFoundException;
import com.todoapp.mapper.TaskMapper;
import com.todoapp.model.Task;
import com.todoapp.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.TimeZone;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private TaskMapper taskMapper;

    @InjectMocks
    private TaskService taskService;


    @Test
    void createTask_ShouldReturnSavedTask() {
        // Arrange
        TaskRequestDTO dto = new TaskRequestDTO("Test Task", LocalDateTime.now());

        Task taskEntity = new Task();
        taskEntity.setId(1L);
        taskEntity.setTitle("Test Task");
        taskEntity.setCompleted(false);
        taskEntity.setDueDate(ZonedDateTime.now(ZoneId.of("UTC")));

        // Cria o response esperado antes de configurar o mock
        TaskResponseDTO expectedResponse = new TaskResponseDTO(taskEntity.getTitle(), taskEntity.isCompleted(), taskEntity.getDueDate().toLocalDateTime());

        // Configura os mocks na ordem correta
        when(taskMapper.toEntity(dto)).thenReturn(taskEntity);
        when(taskRepository.save(taskEntity)).thenReturn(taskEntity);
        when(taskMapper.toResponseDTO(taskEntity)).thenReturn(expectedResponse);

        // Act
        TaskResponseDTO actualResponse = taskService.createTask(dto);

        // Assert
        assertNotNull(actualResponse);
        assertEquals(expectedResponse.title(), actualResponse.title());
        assertEquals(expectedResponse.completed(), actualResponse.completed());
        assertEquals(expectedResponse.dueDate(), actualResponse.dueDate());
    }

    @Test
    void getTask_ShouldReturnSavedTask() {
        Task taskEntity = new Task();
        taskEntity.setId(1L);
        taskEntity.setTitle("Test Task");
        taskEntity.setCompleted(false);
        taskEntity.setDueDate(ZonedDateTime.now(ZoneId.of("UTC")));

        TaskResponseDTO expectedResponse = new TaskResponseDTO(taskEntity.getTitle(), taskEntity.isCompleted(), taskEntity.getDueDate().toLocalDateTime());

        when(taskRepository.findById(1L)).thenReturn(Optional.of(taskEntity));
        when(taskMapper.toResponseDTO(taskEntity)).thenReturn(expectedResponse);

        TaskResponseDTO actualResponse = taskService.getTaskById(1L);

        assertNotNull(actualResponse);
        assertEquals(expectedResponse.title(), actualResponse.title());
        assertEquals(expectedResponse.completed(), actualResponse.completed());
        assertEquals(expectedResponse.dueDate(), actualResponse.dueDate());
    }

    @Test
    void updateTask_ShouldReturnUpdatedTask() {
        TaskRequestDTO updatedDto = new TaskRequestDTO("Update Task", LocalDateTime.now());
        Task taskEntity = new Task();
        taskEntity.setId(1L);
        taskEntity.setTitle("Test Task");
        taskEntity.setCompleted(false);
        taskEntity.setDueDate(ZonedDateTime.now(ZoneId.systemDefault()));
        when(taskRepository.findById(1L)).thenReturn(Optional.of(taskEntity));
        taskEntity.setTitle(updatedDto.title());
        TaskResponseDTO expectedResponse = new TaskResponseDTO(taskEntity.getTitle(), taskEntity.isCompleted(), taskEntity.getDueDate().toLocalDateTime());

        when(taskMapper.toResponseDTO(taskEntity)).thenReturn(expectedResponse);
        when(taskRepository.save(taskEntity)).thenReturn(taskEntity);

        TaskResponseDTO actualResponse = taskService.updateTask(1L, updatedDto);
        assertNotNull(actualResponse);
        assertEquals(expectedResponse.title(), actualResponse.title());
        assertEquals(expectedResponse.completed(), actualResponse.completed());
        assertEquals(expectedResponse.dueDate(), actualResponse.dueDate());
    }

    @Test
    void deleteTask_ShouldDeleteTask() {
        Task task = new Task();
        task.setId(1L);
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        taskService.deleteTask(1L);
        // Verify that the task was deleted
        when(taskRepository.findById(1L)).thenReturn(Optional.empty());
        assertEquals(Optional.empty(), taskRepository.findById(1L));
    }

    @Test
    void getAllTasks_ShouldReturnListOfTasks() {
        Task task1 = new Task();
        task1.setId(1L);
        task1.setTitle("Task 1");

        Task task2 = new Task();
        task2.setId(2L);
        task2.setTitle("Task 2");

        when(taskRepository.findAll()).thenReturn(List.of(task1, task2));

        List<Task> tasks = taskService.getAllTasks();
        assertNotNull(tasks);
        assertEquals(2, tasks.size());
    }

    @Test
    void getTaskById_ShouldThrowException_WhenTaskNotFound() {
        when(taskRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            taskService.getTaskById(1L);
        });

        String expectedMessage = "Tarefa não encontrada com ID: 1";
        String actualMessage = exception.getMessage();

        assertEquals(expectedMessage, actualMessage);
    }

    @Test
    void updateTask_ShouldThrowException_WhenTaskNotFound() {
        TaskRequestDTO updatedTask = new TaskRequestDTO("Updated Task", LocalDateTime.now());

        when(taskRepository.findById(1L)).thenReturn(Optional.empty());

        TaskNotFoundException exception = assertThrows(TaskNotFoundException.class, () -> {
            taskService.updateTask(1L, updatedTask);
        });
        String expectedMessage = "Tarefa não encontrada com ID: 1";
        assertEquals(expectedMessage, exception.getMessage());
    }

    @Test
    void getAllTasks_ShouldReturnEmptyList_WhenNoTasks() {
        when(taskRepository.findAll()).thenReturn(List.of());

        List<Task> tasks = taskService.getAllTasks();
        assertNotNull(tasks);
        assertEquals(0, tasks.size());
    }

    @Test
    void updateTaskCompletion_ShouldReturnUpdatedTaskCompletion() {
        Task task = new Task();
        task.setTitle("Test Task");
        task.setDueDate(ZonedDateTime.now(ZoneId.systemDefault()));
        task.setCompleted(false);

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(taskRepository.save(task)).thenReturn(task);
        taskService.updateTaskCompletion(1L, true);

        assertTrue(task.isCompleted());
    }

    @Test
    void createTask_ShouldThrowException_WhenDueDateIsNull() {
        TaskRequestDTO dto = new TaskRequestDTO("Task without Due Date", null);
        when(taskMapper.toEntity(dto)).thenThrow(IllegalArgumentException.class);
        assertThrows(IllegalArgumentException.class, () -> {
            taskService.createTask(dto);
        });
    }

    @Test
    void createTask_ShouldThrowException_WhenTitleIsNullOrEmpty() {
        TaskRequestDTO invalidDto = new TaskRequestDTO(null, LocalDateTime.now());

        when(taskMapper.toEntity(invalidDto)).thenThrow(IllegalArgumentException.class);
        assertThrows(IllegalArgumentException.class, () -> {
            taskService.createTask(invalidDto);
        });
    }

    @Test
    void createTask_ShouldThrowException_WhenFieldsAreNull() {
        TaskRequestDTO invalidDto = new TaskRequestDTO("", null);

        when(taskMapper.toEntity(invalidDto)).thenThrow(IllegalArgumentException.class);
        assertThrows(IllegalArgumentException.class, () -> {
            taskService.createTask(invalidDto);
        });
    }

}
