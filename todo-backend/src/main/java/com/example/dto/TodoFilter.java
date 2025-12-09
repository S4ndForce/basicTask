package com.example.dto;

import com.example.todo.enums.Category;
import com.example.todo.enums.Priority;
//The DTO for the specification entity  
public class TodoFilter {


    private Priority priority;
    private Category category;
    private String searchTerm;
    private String sortBy;
     public TodoFilter() {}


    public Priority getPriority() {
        return priority;
    }

    public String getSearchTerm(){
        return searchTerm;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
     public void setSearchTerm(String searchTerm) {
        this.searchTerm = searchTerm;
    }

    public void setSortBy(String sortBy){
        this.sortBy = sortBy;
    }


}
