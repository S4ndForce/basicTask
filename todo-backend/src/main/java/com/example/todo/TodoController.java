package com.example.todo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import com.example.todo.dto.CreateTodoRequest;
import com.example.todo.dto.PageResponse;
import com.example.todo.dto.TodoFilter;
import com.example.todo.dto.TodoResponse;
import com.example.todo.dto.UpdateTodoRequest;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    private final TodoService service;

    public TodoController(TodoService service) {
        this.service = service;
    }

    @GetMapping
    public PageResponse<TodoResponse> getAll(
             @RequestParam(required = false) Priority priority,
        @RequestParam(required = false) Category category,
        @RequestParam(required = false) String search,
        @RequestParam(required = false) String sortBy,
        @RequestParam(required = false, defaultValue = "asc") String direction,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        TodoFilter filter = new TodoFilter();
        filter.setCategory(category);
        filter.setPriority(priority);
        filter.setSearchTerm(search);
        Pageable pageable = PageRequest.of(page, size);
        return service.getTodos(search, sortBy, direction, pageable);
    }

    @PostMapping
    public TodoResponse create(@RequestBody @Valid CreateTodoRequest req) {
        return service.createTodo(req);
    }

    @PutMapping("/{id}")
    public TodoResponse update(@PathVariable Long id, @RequestBody @Valid CreateTodoRequest req) {
        return service.updateTodo(id, req);
    }

    @PatchMapping("/{id}")
    public TodoResponse patch(@PathVariable Long id, @RequestBody UpdateTodoRequest req) {
        return service.patchTodo(id, req);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteTodo(id);
    }
    
}