package com.example.project;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.example.todo.TodoItem;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;
@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @OneToMany(mappedBy = "project")
    @JsonIgnore
    private List<TodoItem> todos = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public List<TodoItem> getTodos() {
        return todos;
    }

    public void setName(String title) {
        this.name = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTodos(List<TodoItem> todos) {
        this.todos = todos;
    }

    // Helper: add a todo to this project
    public void addTodo(TodoItem todo) {
        todos.add(todo);
        todo.setProject(this);
    }

    // Helper: remove a todo from this project
    public void removeTodo(TodoItem todo) {
        todos.remove(todo);
        todo.setProject(null);
    }
}


