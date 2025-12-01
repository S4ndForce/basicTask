package com.example.specification;


import org.springframework.data.jpa.domain.Specification;

import com.example.todo.Category;
import com.example.todo.Priority;
import com.example.todo.TodoItem;
   
public class TodoSpecifications {
    public static Specification<TodoItem> hasPriority(Priority priority){
        return(root, query, cb) ->
                                                                //compares database priority to user input priority 
            priority == null ? null : cb.equal(root.get("priority"), priority); 
    }
    public static Specification<TodoItem> hasCategory(Category category) {
        return(root, query, cb) -> 
            category == null ? null : cb.equal(root.get("category"), category);
    }

    public static Specification<TodoItem> belongsToProject(Long projectId) {
        return (root, query, cb) ->           //get the project's id from db
            projectId == null ? null : cb.equal(root.get("project").get("id"), projectId);
    }
}
