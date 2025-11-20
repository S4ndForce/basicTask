package com.example.todo;

public class UpdateTodoRequest {
    private String description;
    private Boolean completed;
    private Category category;
    private Priority priority;

    public String getDescription() { return description; }
    public Boolean getCompleted() { return completed; }
    public Category getCategory() { return category; }
    public Priority getPriority() { return priority; }
}
