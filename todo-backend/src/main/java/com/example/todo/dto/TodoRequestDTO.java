package com.example.todo.dto;

import com.example.todo.Category;
import com.example.todo.Priority;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class TodoRequestDTO {

    @NotBlank(message = "Description cannot be empty")
    @Size(max = 167, message = "Description cannot exceed 167 characters")
    private String description;

    @NotNull(message = "Category is required")
    private Category category;

    @NotNull(message = "Priority is required")
    private Priority priority;

    private Boolean completed = false;

    //getters
    public String getDescription() { return description; }
    public Category getCategory() { return category; }
    public Priority getPriority() { return priority; }
    public Boolean getCompleted() { return completed; }
}