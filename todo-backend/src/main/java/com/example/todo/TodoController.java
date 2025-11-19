package com.example.todo;

import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    private final TodoRepository repository;

    public TodoController(TodoRepository repository) {
        this.repository = repository;
    }

    // ------------------------
    //   HELPERS
    // ------------------------

    /** Ensures consistent JSON Page structure for manual lists */
    private Page<TodoItem> toStablePage(List<TodoItem> list, Pageable pageable) {
        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), list.size());
        List<TodoItem> subList = list.subList(start, end);

        return new PageImpl<>(subList, pageable, list.size());
    }

    private String resolveSortProperty(String sortBy) {
        if (sortBy == null || sortBy.isBlank()) return "createdAt";

        switch (sortBy) {
            case "createdAt":
            case "updatedAt":
            case "description":
            case "category":
            case "id":
                return sortBy;
            default:
                return "createdAt";
        }
    }

    // ------------------------
    //   MAIN GET ENDPOINT
    // ------------------------

    @GetMapping
    public Page<TodoItem> getAllTodos(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String direction,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {

        boolean hasSearch = (search != null && !search.isBlank());
        Pageable pageable = PageRequest.of(page, size);

        // ----------------------------------------------------
        // CASE 1: Search + Priority Sort (custom repository)
        // ----------------------------------------------------
        if ("priority".equalsIgnoreCase(sortBy) && hasSearch) {
            return repository.searchAndSortByPriority(search, pageable);
        }

        // ----------------------------------------------------
        // CASE 2: Priority sorting ONLY
        // (manual list → stable page required)
        // ----------------------------------------------------
        if ("priority".equalsIgnoreCase(sortBy)) {
            List<TodoItem> list = repository.findAllByOrderByPriorityCustom();
            return toStablePage(list, pageable);
        }

        // ----------------------------------------------------
        // CASE 3: normal sorting (with or without search)
        // ----------------------------------------------------
        String sortField = resolveSortProperty(sortBy);

        Sort sort = "desc".equalsIgnoreCase(direction)
                ? Sort.by(Sort.Direction.DESC, sortField)
                : Sort.by(Sort.Direction.ASC, sortField);

        Pageable sortedPageable = PageRequest.of(page, size, sort);

        if (hasSearch) {
            return repository.findByDescriptionContainingIgnoreCase(search, sortedPageable);
        }

        return repository.findAll(sortedPageable);
    }

    // ----------------------------------------------------
    // ALL OTHER CRUD ENDPOINTS (unchanged)
    // ----------------------------------------------------

    @PostMapping
    public TodoItem createTodo(@RequestBody TodoItem todo) {
        return repository.save(todo);
    }

    @PutMapping("/{id}")
    public TodoItem updateTodo(@PathVariable Long id, @RequestBody TodoItem todo) {
        TodoItem existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found: " + id));

        existing.setDescription(todo.getDescription());
        existing.setCompleted(todo.isCompleted());
        existing.setCategory(todo.getCategory());
        existing.setPriority(todo.getPriority());

        return repository.save(existing);
    }

    @PatchMapping("/{id}")
    public TodoItem patchTodo(@PathVariable Long id, @RequestBody UpdateTodoRequest changes) {
        TodoItem existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found: " + id));

        if (changes.getDescription() != null) existing.setDescription(changes.getDescription());
        if (changes.getCompleted() != null) existing.setCompleted(changes.getCompleted());
        if (changes.getCategory() != null) existing.setCategory(changes.getCategory());
        if (changes.getPriority() != null) existing.setPriority(changes.getPriority());

        return repository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @DeleteMapping("/completed")
    public void deleteCompletedTodos() {
        repository.deleteByCompletedTrue();
    }
}
