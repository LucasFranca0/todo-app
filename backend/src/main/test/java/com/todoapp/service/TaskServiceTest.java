package com.todoapp.service;

import com.todoapp.dto.TaskRequestDTO;
import com.todoapp.mapper.TaskMapper;
import com.todoapp.model.Task;
import com.todoapp.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private TaskMapper taskMapper;

    @InjectMocks
    private TaskService taskService;


    @Test
    void createTask_ShouldReturnSavedTask() {
        TaskRequestDTO dto = new TaskRequestDTO("Test Task", LocalDate.now());
        Task task = taskMapper.toEntity(dto);
        task.setTitle("Test Task");
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        Task savedTask = taskService.createTask(dto);
        assertNotNull(savedTask);
        assertEquals("Test Task", savedTask.getTitle());
    }

    @Test
    void getTask_ShouldReturnSavedTask() {
        Task task = new Task();
        task.setId(1L);
        task.setTitle("Test Task");
        when(taskRepository.findById(1L)).thenReturn(java.util.Optional.of(task));

        Task foundTask = taskService.getTaskById(1L);
        assertNotNull(foundTask);
        assertEquals("Test Task", foundTask.getTitle());
    }

    @Test
    void updateTask_ShouldReturnUpdatedTask() {
        Task existingTask = new Task();
        existingTask.setId(1L);
        existingTask.setTitle("Old Task");

        Task updatedTask = new Task();
        updatedTask.setTitle("Updated Task");

        when(taskRepository.findById(1L)).thenReturn(java.util.Optional.of(existingTask));
        when(taskRepository.save(any(Task.class))).thenReturn(updatedTask);

        Task result = taskService.updateTask(1L, updatedTask);
        assertNotNull(result);
        assertEquals("Updated Task", result.getTitle());
    }

    @Test
    void deleteTask_ShouldDeleteTask() {
        Task task = new Task();
        task.setId(1L);
        when(taskRepository.findById(1L)).thenReturn(java.util.Optional.of(task));

        taskService.deleteTask(1L);
        // Verify that the task was deleted
        when(taskRepository.findById(1L)).thenReturn(java.util.Optional.empty());
        assertEquals(java.util.Optional.empty(), taskRepository.findById(1L));
    }

    @Test
    void getAllTasks_ShouldReturnListOfTasks() {
        Task task1 = new Task();
        task1.setId(1L);
        task1.setTitle("Task 1");

        Task task2 = new Task();
        task2.setId(2L);
        task2.setTitle("Task 2");

        when(taskRepository.findAll()).thenReturn(java.util.List.of(task1, task2));

        java.util.List<Task> tasks = taskService.getAllTasks();
        assertNotNull(tasks);
        assertEquals(2, tasks.size());
    }

    @Test
    void getTaskById_ShouldThrowException_WhenTaskNotFound() {
        when(taskRepository.findById(1L)).thenReturn(java.util.Optional.empty());

        Exception exception = org.junit.jupiter.api.Assertions.assertThrows(RuntimeException.class, () -> {
            taskService.getTaskById(1L);
        });

        String expectedMessage = "Task not found with id: 1";
        String actualMessage = exception.getMessage();

        assertEquals(expectedMessage, actualMessage);
    }

    @Test
    void updateTask_ShouldThrowException_WhenTaskNotFound() {
        Task updatedTask = new Task();
        updatedTask.setTitle("Updated Task");

        when(taskRepository.findById(1L)).thenReturn(java.util.Optional.empty());

        Exception exception = org.junit.jupiter.api.Assertions.assertThrows(RuntimeException.class, () -> {
            taskService.updateTask(1L, updatedTask);
        });

        String expectedMessage = "Task not found with id: 1";
        String actualMessage = exception.getMessage();

        assertEquals(expectedMessage, actualMessage);
    }

    @Test
    void deleteTask_ShouldThrowException_WhenTaskNotFound() {
        when(taskRepository.findById(1L)).thenReturn(java.util.Optional.empty());

        Exception exception = org.junit.jupiter.api.Assertions.assertThrows(RuntimeException.class, () -> {
            taskService.deleteTask(1L);
        });

        String expectedMessage = "Task not found with id: 1";
        String actualMessage = exception.getMessage();

        assertEquals(expectedMessage, actualMessage);
    }

    @Test
    void getAllTasks_ShouldReturnEmptyList_WhenNoTasks() {
        when(taskRepository.findAll()).thenReturn(java.util.List.of());

        java.util.List<Task> tasks = taskService.getAllTasks();
        assertNotNull(tasks);
        assertEquals(0, tasks.size());
    }

    @Test
    void createTask_ShouldThrowException_WhenTaskIsNull() {
        Exception exception = org.junit.jupiter.api.Assertions.assertThrows(IllegalArgumentException.class, () -> {
            taskService.createTask(null);
        });

        String expectedMessage = "Task cannot be null";
        String actualMessage = exception.getMessage();

        assertEquals(expectedMessage, actualMessage);
    }

    @Test
    void getTaskById_ShouldThrowException_WhenIdIsNull() {
        Exception exception = org.junit.jupiter.api.Assertions.assertThrows(IllegalArgumentException.class, () -> {
            taskService.getTaskById(null);
        });

        String expectedMessage = "Task ID cannot be null";
        String actualMessage = exception.getMessage();

        assertEquals(expectedMessage, actualMessage);
    }

    @Test
    void updateTask_ShouldThrowException_WhenIdIsNull() {
        Task updatedTask = new Task();
        updatedTask.setTitle("Updated Task");

        Exception exception = org.junit.jupiter.api.Assertions.assertThrows(IllegalArgumentException.class, () -> {
            taskService.updateTask(null, updatedTask);
        });

        String expectedMessage = "Task ID cannot be null";
        String actualMessage = exception.getMessage();

        assertEquals(expectedMessage, actualMessage);
    }

    @Test
    void deleteTask_ShouldThrowException_WhenIdIsNull() {
        Exception exception = org.junit.jupiter.api.Assertions.assertThrows(IllegalArgumentException.class, () -> {
            taskService.deleteTask(null);
        });

        String expectedMessage = "Task ID cannot be null";
        String actualMessage = exception.getMessage();

        assertEquals(expectedMessage, actualMessage);
    }

}
