package com.example.todo;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.stream.Collectors;

import com.example.dto.CreateTodoRequest;
import com.example.dto.PageResponse;
import com.example.dto.TodoFilter;
import com.example.dto.TodoResponse;
import com.example.dto.UpdateTodoRequest;
import com.example.exceptions.ProjectNotFound;
import com.example.exceptions.TodoNotFound;
import com.example.project.Project;
import com.example.project.ProjectRepository;
import com.example.specification.TodoSpecifications.*;
import static com.example.specification.TodoSpecifications.*;

// so basically all these methods compare changes in the frontend to the loaded entity
@Service
public class TodoService {

    private final TodoRepository repo;
    

    private final ProjectRepository projectRepo;

    public TodoService(TodoRepository repo, ProjectRepository projectRepo) {
    this.repo = repo;
    this.projectRepo = projectRepo;
    }
    

    public TodoResponse createTodo(CreateTodoRequest req) {
        TodoItem t = new TodoItem();
        t.setDescription(req.getDescription());
        t.setCategory(req.getCategory());
        t.setPriority(req.getPriority());

        // Sorting mechanism
        t.setPriorityOrder(req.getPriority().getOrder());


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

        // Sorting mechanism
        t.setPriorityOrder(req.getPriority().getOrder());


        t.setCompleted(req.isCompleted());

        return TodoResponse.fromEntity(repo.save(t));
    }

    public TodoResponse patchTodo(Long id, UpdateTodoRequest req) {
        TodoItem t = repo.findById(id)
                .orElseThrow(() -> new TodoNotFound(id));//creates a todoitem object of the id, modifies what it neds, create a project object and add the todo to the project then rreturn a response dto using fromEntity, which then saves the mooidfied todoitem into the repository whhiel also returning a response dto of that same obecjt

        if (req.getDescription() != null) t.setDescription(req.getDescription());
        if (req.getCompleted() != null) t.setCompleted(req.getCompleted());
        if (req.getCategory() != null) t.setCategory(req.getCategory());
        if (req.getPriority() != null){
             t.setPriority(req.getPriority());
             t.setPriorityOrder(req.getPriority().getOrder());
        }
        
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

    public PageResponse<TodoResponse> getFilteredTodos(TodoFilter filter,  Pageable pageable) {
        Specification<TodoItem> spec = Specification
        .allOf(hasPriority(filter.getPriority()))
        .and(hasCategory(filter.getCategory()))
        .and(hasSearch(filter.getSearchTerm()));
        Page<TodoItem> page;
        page = repo.findAll(spec, pageable);
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

    /* 
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
    */
}
    

