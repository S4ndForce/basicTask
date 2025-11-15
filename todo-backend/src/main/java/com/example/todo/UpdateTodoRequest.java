package com.example.todo;

public class UpdateTodoRequest {
    private String description;
    private Boolean completed;
    private String category;
    private String priority;

    public String getDescription() { return description; }
    public Boolean getCompleted() { return completed; }
    public String getCategory() { return category; }
    public String getPriority() { return priority; }
}
