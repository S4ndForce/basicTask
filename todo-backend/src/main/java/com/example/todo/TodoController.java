package com.example.todo;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000")

public class TodoController {

    private final TodoRepository repository;

    public TodoController(TodoRepository repository) {
        this.repository = repository;
    }

    // GET all todos
    
    

    // POST new todo
    @PostMapping
    public TodoItem createTodo(@RequestBody TodoItem todo) {
        return repository.save(todo);
    }

    // PUT update todo by id
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

    // DELETE todo by id
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
                          @RequestBody UpdateTodoRequest changes) {

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
    public Page<TodoItem> getAllTodos(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String direction,
            @RequestParam(defaultValue = "0") int page,
             @RequestParam(defaultValue = "10") int size
    ) {

    boolean hasSearch = (search != null && !search.isBlank());

    // 1. PRIORITY sorting uses custom query
    if ("priority".equalsIgnoreCase(sortBy)) {
        List<TodoItem> list;
        if (hasSearch) {
            // later we'll add support for search + custom priority
            list = repository.findByDescriptionContainingIgnoreCase(search);
        }
        else{
            list = repository.findAllByOrderByPriorityCustom();
        }
        
         return new PageImpl<TodoItem>(list);
    }

    // 2. Resolve which column to sort by
    String sortField = resolveSortProperty(sortBy);

    // 3. Determine direction
    Sort sort = "desc".equalsIgnoreCase(direction)
            ? Sort.by(Sort.Direction.DESC, sortField)
            : Sort.by(Sort.Direction.ASC, sortField);

      Pageable pageable = PageRequest.of(page, size, sort);
    // 4. Search + sort
    if (hasSearch) {
        return repository.findByDescriptionContainingIgnoreCase(search, pageable);
    }

    // 5. Just sort
    return repository.findAll(pageable);
    }

    private String resolveSortProperty(String sortBy) {
        if (sortBy == null || sortBy.isBlank()) {
            return "createdAt";   // default sorting
        }

        switch (sortBy) {
            case "createdAt":
            case "updatedAt":
            case "description":
            case "category":
                return sortBy;
            default:
                return "createdAt";
            case "id":
                return "id";
        }
        
    }
    
 }
