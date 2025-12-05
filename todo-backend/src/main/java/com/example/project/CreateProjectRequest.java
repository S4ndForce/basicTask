package com.example.project;

import jakarta.validation.constraints.NotBlank;

public class CreateProjectRequest {
    @NotBlank
    private String name;

    private String description;

    public String getName(){
        return name;
    }

    public String getDescription(){
        return description;
    }

}
