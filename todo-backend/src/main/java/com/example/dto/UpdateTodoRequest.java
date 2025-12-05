package com.example.dto;

import com.example.todo.Category;
import com.example.todo.Priority;

public class UpdateTodoRequest {
    private String description;
    private Boolean completed;
    private Category category;
    private Priority priority;
    private Long projectId;

    public Long getProjectId() { return projectId; }
    public String getDescription() { return description; }
    public Boolean getCompleted() { return completed; }
    public Category getCategory() { return category; }
    public Priority getPriority() { return priority; }
}
