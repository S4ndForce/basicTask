package com.example.todo;

public class UpdateTodoRequest {
    private String description;
    private Boolean completed;
    private Category category;
    private String priority;

    public String getDescription() { return description; }
    public Boolean getCompleted() { return completed; }
    public Category getCategory() { return category; }
    public String getPriority() { return priority; }
}
