package com.example.todo;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.example.project.Project;
import com.example.todo.enums.Category;
import com.example.todo.enums.Priority;

@Entity
public class TodoItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private boolean completed;

    @Enumerated(EnumType.STRING)
    private Category category;  

    @Enumerated(EnumType.STRING)
    private Priority priority;   

    @Column(name = "priority_order")
    private Integer priorityOrder;
    
     public Integer getPriorityOrder() {
        return priorityOrder;
    }

    public void setPriorityOrder(Integer priorityOrder) {
        this.priorityOrder = priorityOrder;
    }

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name ="project_id")
    private Project project;
    //add getters and setters for this
    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }
    public TodoItem() {}

    public Long getId() { return id; }
    public String getDescription() { return description; }
    public boolean isCompleted() { return completed; }
    public Category getCategory() { return category; }
    public Priority getPriority() { return priority; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public void setDescription(String description) { this.description = description; }
    public void setCompleted(boolean completed) { this.completed = completed; }
    public void setCategory(Category category) { this.category = category; }
    public void setPriority(Priority priority) { this.priority = priority; }
}
