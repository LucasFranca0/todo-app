package com.todoapp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private boolean completed;

    @Column(name = "due_date", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private ZonedDateTime dueDate;
}
