package com.example.todo;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import org.springframework.data.domain.Page;


@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000")

public class TodoController {

    private final TodoService service;

    public TodoController(TodoService service) {
        this.service = service;
    }
 @GetMapping
    public Page<TodoItem> getAll(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String direction,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return service.getTodos(search, sortBy, direction, pageable );
    }

    // CREATE
    @PostMapping
    public TodoItem create(@RequestBody @Valid CreateTodoRequest req) {
        return service.createTodo(req);
    }

    // UPDATE FULL
    @PutMapping("/{id}")
    public TodoItem update(@PathVariable Long id, @RequestBody @Valid CreateTodoRequest req) {
        return service.updateTodo(id, req);
    }

    // PATCH
    @PatchMapping("/{id}")
    public TodoItem patch(@PathVariable Long id, @RequestBody UpdateTodoRequest req) {
        return service.patchTodo(id, req);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteTodo(id);
    }
    
 }
