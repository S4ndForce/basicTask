package com.example.todo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateTodoRequest {
    @NotBlank
    private String description;

    @NotNull
    private Category category;

    @NotNull
    private Priority priority;

     @NotNull
    private Boolean completed;

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
