package com.example.todo;

import org.springframework.stereotype.Service;

import com.example.todo.Exceptions.ProjectNotFound;
import com.example.todo.Exceptions.TodoNotFound;
import com.example.todo.Project.Project;
import com.example.todo.Project.ProjectRepository;
import com.example.todo.dto.CreateTodoRequest;
import com.example.todo.dto.PageResponse;
import com.example.todo.dto.TodoFilter;
import com.example.todo.dto.TodoResponse;
import com.example.todo.dto.UpdateTodoRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.stream.Collectors;
import com.example.specification.TodoSpecifications.*;
@Service
public class TodoService {

    private final TodoRepository repo;
    

    private final ProjectRepository projectRepo;

    public TodoService(TodoRepository repo, ProjectRepository projectRepo) {
    this.repo = repo;
    this.projectRepo = projectRepo;
    }
    public PageResponse<TodoResponse> getTodos(
            String search,
            String sortBy,
            String direction,
            Pageable pageable
    ) {
        Page<TodoItem> page;

        boolean hasSearch = (search != null && !search.isBlank());

        if ("priority".equalsIgnoreCase(sortBy) && hasSearch) {
            page = repo.searchAndSortByPriority(search, pageable);
        }
        else if ("priority".equalsIgnoreCase(sortBy)) {
            var list = repo.findAllByOrderByPriorityCustom();
            page = new org.springframework.data.domain.PageImpl<>(list, pageable, list.size());
        }
        else if (hasSearch) {
            page = repo.findByDescriptionContainingIgnoreCase(search, pageable);
        }
        else {
            page = repo.findAll(pageable);
        }
            var content = page.map(TodoResponse::fromEntity).toList(); //wraps Page into PageResposne dto
        return new PageResponse<>(
            //same thing just restricted in terms of page
            content,
            page.getNumber(), 
            page.getSize(),
            page.getTotalElements(),
            page.getTotalPages()
        );
    }

    public TodoResponse createTodo(CreateTodoRequest req) {
        TodoItem t = new TodoItem();
        t.setDescription(req.getDescription());
        t.setCategory(req.getCategory());
        t.setPriority(req.getPriority());
        t.setCompleted(req.isCompleted());
        // NEW: assign project if provided
        if (req.getProjectId() != null) {
        Project project = projectRepo.findById(req.getProjectId())
                .orElseThrow(() -> new ProjectNotFound(req.getProjectId()));
        t.setProject(project);
    }

        return TodoResponse.fromEntity(repo.save(t));
    }

    public TodoResponse updateTodo(Long id, CreateTodoRequest req) {
        TodoItem t = repo.findById(id)
                .orElseThrow(() -> new TodoNotFound(id));

        t.setDescription(req.getDescription());
        t.setCategory(req.getCategory());
        t.setPriority(req.getPriority());
        t.setCompleted(req.isCompleted());

        return TodoResponse.fromEntity(repo.save(t));
    }

    public TodoResponse patchTodo(Long id, UpdateTodoRequest req) {
        TodoItem t = repo.findById(id)
                .orElseThrow(() -> new TodoNotFound(id));

        if (req.getDescription() != null) t.setDescription(req.getDescription());
        if (req.getCompleted() != null) t.setCompleted(req.getCompleted());
        if (req.getCategory() != null) t.setCategory(req.getCategory());
        if (req.getPriority() != null) t.setPriority(req.getPriority());
        if (req.getProjectId() != null) {
    Project project = projectRepo.findById(req.getProjectId())
        .orElseThrow(() -> new ProjectNotFound(req.getProjectId()));
    t.setProject(project);
}

        return TodoResponse.fromEntity(repo.save(t));
    }

    public void deleteTodo(Long id) {
        if (!repo.existsById(id)) throw new TodoNotFound(id);
        repo.deleteById(id);
    }

    
}
