package com.todoapp.mapper;

import com.todoapp.dto.TaskRequestDTO;
import com.todoapp.dto.TaskResponseDTO;
import com.todoapp.model.Task;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import static org.assertj.core.api.Assertions.assertThat;

class TaskMapperTest {

    @Test
    void shouldMapTaskToTaskResponseDTO() {
        Task task = new Task();
        task.setId(1L);
        task.setTitle("Test Task");
        task.setCompleted(false);
        task.setDueDate(ZonedDateTime.of(2023, 12, 31, 23, 59, 0, 0, ZoneId.systemDefault()));
        TaskMapper taskMapper = Mappers.getMapper(TaskMapper.class);
        TaskResponseDTO responseDTO = taskMapper.toResponseDTO(task);

        assertThat(responseDTO).isNotNull();
        assertThat(responseDTO.title()).isEqualTo("Test Task");
        assertThat(responseDTO.completed()).isFalse();
        assertThat(responseDTO.dueDate()).isEqualTo(LocalDateTime.of(2023, 12, 31, 23, 59));
    }

    @Test
    void shouldMapTaskRequestDTOToTask() {
        TaskRequestDTO requestDTO = new TaskRequestDTO("New Task", LocalDateTime.of(2023, 12, 31, 23, 59));

        TaskMapper taskMapper = Mappers.getMapper(TaskMapper.class);
        Task task = taskMapper.toEntity(requestDTO);

        assertThat(task).isNotNull();
        assertThat(task.getTitle()).isEqualTo("New Task");
        assertThat(task.getDueDate()).isEqualTo(ZonedDateTime.of(2023, 12, 31, 23, 59, 0, 0, ZoneId.of("America/Sao_Paulo")));
    }

    @Test
    void shouldConvertLocalDateTimeToZonedDateTime() {
        LocalDateTime localDateTime = LocalDateTime.of(2023, 12, 31, 23, 59);
        ZonedDateTime zonedDateTime = TaskMapper.convertLocalDateTimeToZonedDateTime(localDateTime);

        assertThat(zonedDateTime).isNotNull();
        assertThat(zonedDateTime.getYear()).isEqualTo(2023);
        assertThat(zonedDateTime.getMonthValue()).isEqualTo(12);
        assertThat(zonedDateTime.getDayOfMonth()).isEqualTo(31);
        assertThat(zonedDateTime.getHour()).isEqualTo(23);
        assertThat(zonedDateTime.getMinute()).isEqualTo(59);
    }

    @Test
    void shouldReturnNullWhenLocalDateTimeIsNull() {
        LocalDateTime localDateTime = null;
        ZonedDateTime zonedDateTime = TaskMapper.convertLocalDateTimeToZonedDateTime(localDateTime);

        assertThat(zonedDateTime).isNull();
    }
}