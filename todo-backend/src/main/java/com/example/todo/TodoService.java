package com.example.todo;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.validation.Valid;

@Service
public class TodoService {

    private final TodoRepository repository;

    public TodoService(TodoRepository repository) {
        this.repository = repository;
    }

    @PutMapping("/{id}")
    public TodoItem updateTodo(@PathVariable Long id, @RequestBody CreateTodoRequest req) {
        TodoItem existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found: " + id));
        existing.setDescription(req.getDescription());
        existing.setCompleted(req.isCompleted());
        existing.setCategory(req.getCategory());
        existing.setPriority(req.getPriority());
        return repository.save(existing);
    }

    @PostMapping
    public TodoItem createTodo(@Valid @RequestBody CreateTodoRequest req) {
        TodoItem todo = new TodoItem();
        todo.setDescription(req.getDescription());
        todo.setCategory(req.getCategory());
        todo.setPriority(req.getPriority());
        todo.setCompleted(false);
        return repository.save(todo);
    }
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @DeleteMapping("/completed")
    public void deleteCompletedTodos(){
        repository.deleteByCompletedTrue(); //checks the key words in the repository so that it will work properly on items that are marked as completed


    }

    @PatchMapping("/{id}")
    public TodoItem patchTodo(@PathVariable Long id,
                          @Valid @RequestBody UpdateTodoRequest changes) {

    TodoItem existing = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Todo not found: " + id));

    if (changes.getDescription() != null) {
        existing.setDescription(changes.getDescription());
    }

    if (changes.getCompleted() != null) {
        existing.setCompleted(changes.getCompleted());
    }

    if (changes.getCategory() != null) {
        existing.setCategory(changes.getCategory());
    }

    if (changes.getPriority() != null) {
        existing.setPriority(changes.getPriority());
    }

    return repository.save(existing);
}


 @GetMapping
     public Page<TodoItem> getTodos(
            String search,
            String sortBy,
            String direction,
            Pageable pageable
    ) {
        boolean hasSearch = (search != null && !search.isBlank());

        if ("priority".equalsIgnoreCase(sortBy) && hasSearch) {
            return repository.searchAndSortByPriority(search, pageable);
        }

        if ("priority".equalsIgnoreCase(sortBy)) {
            return new org.springframework.data.domain.PageImpl<>(
                    repository.findAllByOrderByPriorityCustom(),
                    pageable,
                    repository.count()
            );
        }

        if (hasSearch) {
            return repository.findByDescriptionContainingIgnoreCase(search, pageable);
        }

        return repository.findAll(pageable);
    }

}

