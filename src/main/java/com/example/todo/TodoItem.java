package com.example.todo;

import jakarta.persistence.*;

@Entity
public class TodoItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
        
    private String description;
    private boolean completed;

     public TodoItem() { }

    public Long getId(){
        return id;
    }

    public String getDescription(){
        return description;

    }

    public boolean isCompleted() {
        return completed;
    }

    public void setDescription(String description){
        this.description = description;
    }
     public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
    
