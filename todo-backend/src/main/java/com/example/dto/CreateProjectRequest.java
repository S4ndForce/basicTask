package com.example.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateProjectRequest {
    @NotBlank
    @Size(max = 167, message = "Description cannot exceed 167 characters")
    private String name;

    private String description;

    public String getName(){
        return name;
    }

    public String getDescription(){
        return description;
    }

}
