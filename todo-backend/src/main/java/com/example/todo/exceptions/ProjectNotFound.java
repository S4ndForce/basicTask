package com.example.todo.exceptions;

public class ProjectNotFound extends RuntimeException {
    public ProjectNotFound (Long id){
        super("Project with id: " + id + " not found");
    }
}
