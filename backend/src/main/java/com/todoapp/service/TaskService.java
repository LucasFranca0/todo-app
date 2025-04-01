package com.todoapp.service;

import com.todoapp.dto.TaskRequestDTO;
import com.todoapp.dto.TaskResponseDTO;
import com.todoapp.exception.GlobalExceptionHandler;
import com.todoapp.exception.TaskNotFoundException;
import com.todoapp.mapper.TaskMapper;
import com.todoapp.model.Task;
import com.todoapp.repository.TaskRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    public TaskService(TaskRepository taskRepository, TaskMapper taskMapper) {
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
    }

    public Task createTask(TaskRequestDTO dto) {
        Task task = taskMapper.toEntity(dto);
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    }

    public Task updateTask(Long id, Task task) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        existingTask.setTitle(task.getTitle());
        existingTask.setCompleted(task.isCompleted());
        existingTask.setDueDate(task.getDueDate());
        return taskRepository.save(existingTask);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public TaskResponseDTO markTaskAsCompleted(Long id) {
        Task task = taskRepository.findById(id)
                        .orElseThrow(()-> new TaskNotFoundException(id));
        task.setCompleted(true);
        Task updatedTask = taskRepository.save(task);
        return taskMapper.toResponseDTO(updatedTask);
    }

}
