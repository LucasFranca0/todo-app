package com.todoapp.service;

import com.todoapp.dto.TaskRequestDTO;
import com.todoapp.dto.TaskResponseDTO;
import com.todoapp.exception.TaskNotFoundException;
import com.todoapp.mapper.TaskMapper;
import com.todoapp.model.Task;
import com.todoapp.repository.TaskRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@Service
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private static final Logger log = LoggerFactory.getLogger(TaskService.class);

    private Task findTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    public TaskService(TaskRepository taskRepository, TaskMapper taskMapper) {
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
    }

    public TaskResponseDTO createTask(@Valid TaskRequestDTO dto) {
        Task task = taskMapper.toEntity(dto);
        Task savedTask = taskRepository.save(task);
        return taskMapper.toResponseDTO(savedTask);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public TaskResponseDTO getTaskById(Long id) {
        Task task = findTaskById(id);
        return taskMapper.toResponseDTO(task);
    }

    public TaskResponseDTO updateTask(Long id, TaskRequestDTO dto) {
        Task existingTask = findTaskById(id);
        if(dto.dueDate() != null) {
            existingTask.setDueDate(dto.dueDate().atZone(ZoneId.systemDefault()));
        }
        if(dto.title() != null) {
            existingTask.setTitle(dto.title());
        }
        return taskMapper.toResponseDTO(taskRepository.save(existingTask));
    }

    public void deleteTask(Long id) {
        Task task = findTaskById(id);
        taskRepository.delete(task);
        log.info("Task with id {} deleted successfully", id);
    }

    public TaskResponseDTO updateTaskCompletion(Long id, Boolean completed) {
        Task task = findTaskById(id);
        task.setCompleted(completed);
        Task updatedTask = taskRepository.save(task);
        log.info("Task with id {} marked as {}", id, completed ? "completed" : "not completed");
        return taskMapper.toResponseDTO(updatedTask);
    }


}
