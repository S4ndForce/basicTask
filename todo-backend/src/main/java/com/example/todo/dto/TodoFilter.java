package com.example.todo.dto;

import com.example.todo.Category;
import com.example.todo.Priority;

public class TodoFilter {
    private Priority priority;
    private Category category;
     public TodoFilter() {}


    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

}
