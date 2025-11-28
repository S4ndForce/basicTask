package com.example.todo.Project;

import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.todo.TodoItem;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;



public interface ProjectRepository extends JpaRepository<Project, Long> {
    
}