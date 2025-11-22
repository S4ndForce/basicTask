package com.example.todo;

import com.example.todo.exceptions.TodoNotFound;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.stream.Collectors;

@Service
public class TodoService {

    private final TodoRepository repo;

    public TodoService(TodoRepository repo) {
        this.repo = repo;
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

        return TodoResponse.fromEntity(repo.save(t));
    }

    public void deleteTodo(Long id) {
        if (!repo.existsById(id)) throw new TodoNotFound(id);
        repo.deleteById(id);
    }
}
