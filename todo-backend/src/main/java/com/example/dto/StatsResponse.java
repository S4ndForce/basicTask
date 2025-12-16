package com.example.dto;

import java.util.Map;
import com.example.todo.enums.Category;
import com.example.todo.enums.Priority;

public class StatsResponse {
    private Integer totalTodos;
    private Integer completedCount;
    private Integer activeCount;
    private Map<Priority, Long> countByPriority;
    private Map<Category, Long> countByCategory;

    public Integer getTotalTodos() {
    return totalTodos;
}

public void setTotalTodos(Integer totalTodos) {
    this.totalTodos = totalTodos;
}

public Integer getCompletedCount() {
    return completedCount;
}

public void setCompletedCount(Integer completedCount) {
    this.completedCount = completedCount;
}

public Integer getActiveCount() {
    return activeCount;
}

public void setActiveCount(Integer activeCount) {
    this.activeCount = activeCount;
}

public Map<Priority, Long> getCountByPriority() {
    return countByPriority;
}

public void setCountByPriority(Map<Priority, Long> countByPriority) {
    this.countByPriority = countByPriority;
}

public  Map<Category, Long> getCountByCategory() {
    return countByCategory;
}

public void setCountByCategory( Map<Category, Long> countByCategory) {
    this.countByCategory = countByCategory;
}

}
