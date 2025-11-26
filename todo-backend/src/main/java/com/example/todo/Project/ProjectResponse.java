package com.example.todo.Project;

import java.time.LocalDateTime;

public class ProjectResponse{
    private Long id;
    private String name;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    //wraps the Project entity to a response dto
    public static ProjectResponse fromEntity(Project p){
        var response = new ProjectResponse();
        response.id = p.getId();
        response.name = p.getName();
        response.description = p.getDescription();
        response.createdAt = p.getCreatedAt();
        response.updatedAt = p.getUpdatedAt();
        
        return response;

    }
}