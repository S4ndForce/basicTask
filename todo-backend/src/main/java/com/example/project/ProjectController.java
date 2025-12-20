package com.example.project;

import java.util.List;

import com.example.dto.CreateProjectRequest;
import com.example.dto.CreateTodoRequest;
import com.example.dto.ProjectResponse;
import com.example.dto.TodoResponse;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import jakarta.validation.Valid;

//deals with http requests
@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {
    private final ProjectService service;
    public ProjectController(ProjectService service){
        this.service = service;
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
    public List<TodoResponse> getTodosByProject(
        @PathVariable Long projectId
       
) {

    return service.getTodosByProject(projectId);
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

    
}
