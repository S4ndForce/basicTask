package com.example.todo.Project;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.todo.TodoResponse;
import com.example.todo.Exceptions.ProjectNotFound;

@Service
public class ProjectService {
    private final ProjectRepository repo;

    public ProjectService(ProjectRepository repo){
        this.repo = repo;
    }

    // Give a project back
    //Anything to do with giving something to the front end must be response
    public ProjectResponse createProject(CreateProjectRequest req) {
        Project p = new Project();
        p.setName(req.getName());
        p.setDescription(req.getDescription());
        return ProjectResponse.fromEntity(repo.save(p));
    }

    public List<ProjectResponse> getAllProjects(){
        return repo.findAll().stream().map(ProjectResponse::fromEntity).toList();
    }

    //gets project from repo so it can be wrapped into response through .fromEntity()
    public ProjectResponse getById(Long id) {
        Project p = repo.findById(id)
        .orElseThrow(() -> new ProjectNotFound(id));

        return ProjectResponse.fromEntity(p);
        //brilliant design
        
    }


    public List<TodoResponse> getTodosByProject(Long id){
        Project p = repo.findById(id)
        .orElseThrow(() -> new ProjectNotFound(id));

        return p.getTodos().stream().map(TodoResponse::fromEntity).toList();
    }
}
