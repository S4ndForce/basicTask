package com.example.todo;

import java.time.LocalDateTime;

public class TodoResponse {

    private Long id;
    private String description;
    private boolean completed;
    private Category category;
    private Priority priority;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long projectId;

    public TodoResponse(
            Long id,
            String description,
            boolean completed,
            Category category,
            Priority priority,
            LocalDateTime createdAt,
            LocalDateTime updatedAt,
            Long projectId
    ) {
        this.id = id;
        this.description = description;
        this.completed = completed;
        this.category = category;
        this.priority = priority;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.projectId = projectId;
    }

    public Long getId() { return id; }
    public String getDescription() { return description; }
    public boolean isCompleted() { return completed; }
    public Category getCategory() { return category; }
    public Priority getPriority() { return priority; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public static TodoResponse fromEntity(TodoItem item) {
        return new TodoResponse(
                item.getId(),
                item.getDescription(),
                item.isCompleted(),
                item.getCategory(),
                item.getPriority(),
                item.getCreatedAt(),
                item.getUpdatedAt(), 
                item.getProject() == null ? null : item.getProject().getId() 
        );
    }
}