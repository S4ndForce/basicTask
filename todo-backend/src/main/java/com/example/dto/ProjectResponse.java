package com.example.dto;

import java.time.LocalDateTime;

import com.example.project.Project;

public class ProjectResponse {

    private Long id;
    private String name;
    private String description;

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }

    public static ProjectResponse fromEntity(Project p) {
        ProjectResponse r = new ProjectResponse();
        r.id = p.getId();
        r.name = p.getName();
        r.description = p.getDescription();
        return r;
    }
}