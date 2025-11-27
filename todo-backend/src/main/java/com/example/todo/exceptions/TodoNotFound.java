package com.example.todo.Exceptions;

public class TodoNotFound  extends RuntimeException{
     public TodoNotFound(Long id) {
        super("Todo with id " + id + " not found.");
    }
}
