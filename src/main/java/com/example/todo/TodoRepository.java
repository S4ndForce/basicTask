package com.example.todo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<TodoItem, Long> {
    
}