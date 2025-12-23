package com.example.project;

import java.util.List;

import com.example.dto.CreateProjectRequest;
import com.example.dto.CreateTodoRequest;
import com.example.dto.PageResponse;
import com.example.dto.ProjectResponse;
import com.example.dto.StatsResponse;
import com.example.dto.TodoFilter;
import com.example.dto.TodoResponse;
import com.example.todo.TodoService;
import com.example.todo.enums.Category;
import com.example.todo.enums.Priority;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.todo.TodoRepository;



import jakarta.validation.Valid;

//deals with http requests
@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {
    private final ProjectService service;
    private final TodoService todoService;

    public ProjectController(ProjectService service, TodoService todoService){
        this.service = service;
        this.todoService = todoService;
    }

    @PostMapping
    public ProjectResponse create(@RequestBody @Valid CreateProjectRequest req) {
        return service.createProject(req);
    }

    @PostMapping("/{projectId}/todos")
    public TodoResponse createTodoInProject(
        @PathVariable Long projectId,
        @RequestBody @Valid CreateTodoRequest req) {
            return service.createTodoInProject(projectId, req);
        }

    @GetMapping("/{projectId}/todos")
    public PageResponse<TodoResponse> getTodosByProject(
        @PathVariable Long projectId,
        @RequestParam(required = false) String search,
        @RequestParam(required = false) String priority,
        @RequestParam(required = false) String category,
        @RequestParam(required = false) String sortBy,
        @RequestParam(defaultValue = "asc") String direction,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    )   {
    TodoFilter filter = new TodoFilter();
    filter.setSearchTerm(search);

    if (priority != null && !priority.isBlank()) {
        filter.setPriority(Priority.valueOf(priority.toUpperCase()));
    }

    if (category != null && !category.isBlank()) {
        filter.setCategory(Category.valueOf(category.toUpperCase()));
    }

    Sort sort = Sort.by(
        direction.equalsIgnoreCase("desc")
            ? Sort.Direction.DESC
            : Sort.Direction.ASC,
        sortBy == null || sortBy.isBlank() ? "createdAt" : sortBy
    );

    Pageable pageable = PageRequest.of(page, size, sort);

    return service.getTodosByProject(projectId, filter, pageable);
    }


    @GetMapping
    public List<ProjectResponse> getAll() {
        return service.getAllProjects();
    }

    @GetMapping("/{id}")
    public ProjectResponse getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id){
         service.deleteById(id);
    }

    @GetMapping("/{projectId}/stats")
    public StatsResponse getStats() {
        return todoService.getTodoStats();
    }

    
}
