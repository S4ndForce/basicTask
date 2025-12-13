package com.example.todo;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import com.example.dto.CreateTodoRequest;
import com.example.dto.PageResponse;
import com.example.dto.TodoFilter;
import com.example.dto.TodoResponse;
import com.example.dto.UpdateTodoRequest;
import com.example.todo.enums.Category;
import com.example.todo.enums.Priority;

import org.springframework.data.domain.Sort;
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
        @RequestParam(required = false) String search,
        @RequestParam(required = false) String sortBy,
        @RequestParam(required = false, defaultValue = "asc") String direction,
        @RequestParam(required = false) String priority,
        @RequestParam(required = false) String category,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        TodoFilter filter = new TodoFilter(); //adds each entity's unique filter in the specification
        if (category != null && !category.isBlank()) {
    filter.setCategory(Category.valueOf(category.toUpperCase()));
}
        if (priority != null && !priority.isBlank()) {
    filter.setPriority(Priority.valueOf(priority.toUpperCase()));
}
        filter.setSearchTerm(search);

        //check is sortBy is blank, if so sort by default 
       String sortField = (sortBy == null || sortBy.isBlank())
            ? "createdAt"   // default field to sort by
            : sortBy;

        Sort.Direction sortDirection =
            direction.equalsIgnoreCase("desc")
                    ? Sort.Direction.DESC
                    : Sort.Direction.ASC;

    Sort sort = Sort.by(sortDirection, sortField);
      Pageable pageable = PageRequest.of(page, size, sort);

        return service.getFilteredTodos(filter, pageable);
    }

    @PostMapping
    public TodoResponse create(@RequestBody @Valid CreateTodoRequest req) {
        return service.createTodo(req);
    }

    @PutMapping("/{id}") //take in id because it requires individual todos
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