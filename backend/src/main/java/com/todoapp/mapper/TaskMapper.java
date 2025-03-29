package com.todoapp.mapper;

import com.todoapp.dto.TaskRequestDTO;
import com.todoapp.dto.TaskResponseDTO;
import com.todoapp.model.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    TaskMapper INSTANCE = Mappers.getMapper(TaskMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "completed", constant = "false")
    Task toEntity(TaskRequestDTO dto);
    TaskResponseDTO toResponseDTO(Task task);
}
