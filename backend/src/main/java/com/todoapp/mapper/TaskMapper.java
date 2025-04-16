package com.todoapp.mapper;

import com.todoapp.dto.TaskRequestDTO;
import com.todoapp.dto.TaskResponseDTO;
import com.todoapp.model.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    TaskMapper INSTANCE = Mappers.getMapper(TaskMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "completed", constant = "false")
    @Mapping(target = "dueDate", source = "dueDate", qualifiedByName = "localDateTimeToZonedDateTime")
    Task toEntity(TaskRequestDTO dto);

    @Mapping(target = "dueDate", source = "dueDate", dateFormat = "yyyy-MM-dd'T'HH:mm:ssXXX")
    TaskResponseDTO toResponseDTO(Task task);

    @Named("localDateTimeToZonedDateTime")
    static ZonedDateTime convertLocalDateTimeToZonedDateTime(LocalDateTime localDateTime) {
        return localDateTime != null
                ? localDateTime.atZone(ZoneId.of("America/Sao_Paulo"))
                : null;
    }
}
