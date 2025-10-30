package com.example.todo;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3001")

public class TodoController {

    private final TodoRepository repository;

    public TodoController(TodoRepository repository) {
        this.repository = repository;
    }

    // GET all todos
    @GetMapping
    public List<TodoItem> getAllTodos(
        @RequestParam(required = false, defaultValue = "false") boolean sortByPriority){
            
        if(sortByPriority){
            return repository.findAllByOrderByPriorityCustom();
        }
        return repository.findAll();
    }

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
        return repository.save(existing);
    }

    // DELETE todo by id
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @DeleteMapping("/completed")
    public void deleteCompletedTodos(){
        repository.deleteByCompletedTrue(); //checks each version so that it will include everything

        
    }
    }
