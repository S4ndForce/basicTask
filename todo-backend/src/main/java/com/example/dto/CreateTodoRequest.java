package com.example.dto;

import com.example.todo.enums.Category;
import com.example.todo.enums.Priority;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreateTodoRequest {
    @NotBlank(message = "Description cannot be empty")
    @Size(max = 167, message = "Description cannot exceed 167 characters")
    private String description;

    @NotNull
    private Category category;

    @NotNull
    private Priority priority;

     @NotNull
    private Boolean completed = false;
    private Long projectId; // <-- optional

    public Long getProjectId() { return projectId; }

    public CreateTodoRequest() {}

    public String getDescription() {
        return description;
    }

    public Category getCategory() {
        return category;
    }

    public Priority getPriority() {
        return priority;
    }
    public Boolean isCompleted(){
        return completed;
    }
}
