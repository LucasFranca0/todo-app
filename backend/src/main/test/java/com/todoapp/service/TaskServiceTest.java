package com.todoapp.service;

import com.todoapp.model.Task;
import com.todoapp.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @Test
    void createTask_ShouldReturnSavedTask() {
        Task task = new Task();
        task.setTitle("Test Task");
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        Task savedTask = taskService.createTask(task);
        assertNotNull(savedTask);
        assertEquals("Test Task", savedTask.getTitle());
    }
}
