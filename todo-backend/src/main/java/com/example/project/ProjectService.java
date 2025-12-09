package com.example.project;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;



import static com.example.specification.TodoSpecifications.*;

import com.example.dto.CreateTodoRequest;
import com.example.dto.TodoFilter;
import com.example.dto.TodoResponse;
import com.example.exceptions.ProjectNotFound;
import com.example.todo.TodoItem;
import com.example.todo.TodoRepository;

import jakarta.transaction.Transactional;

@Service
public class ProjectService {
    private final ProjectRepository projectRepo;
    private final TodoRepository todoRepo;


    //service constructor
    public ProjectService(ProjectRepository projectRepo, TodoRepository todoRepo){
        this.projectRepo = projectRepo;
        this.todoRepo = todoRepo;

    }

    // Give a project back
    //Anything to do with giving something to the front end must be response
    public ProjectResponse createProject(CreateProjectRequest req) {
        Project p = new Project();
        p.setName(req.getName());
        p.setDescription(req.getDescription());
        return ProjectResponse.fromEntity(projectRepo.save(p));
    }

    public List<ProjectResponse> getAllProjects(){
        return projectRepo.findAll().stream().map(ProjectResponse::fromEntity).toList();
        //go to respository, take it all and put each ProjectResponse and turn it into a list
    }

    //gets project from repo so it can be wrapped into response through .fromEntity()
    public ProjectResponse getById(Long id) {
        Project p = projectRepo.findById(id) //findById is a built in method in Crud repo
        .orElseThrow(() -> new ProjectNotFound(id));

        return ProjectResponse.fromEntity(p);
        //brilliant design
        
    }

    public TodoResponse createTodoInProject(Long projectId, CreateTodoRequest req){
        Project project = projectRepo.findById(projectId)
        .orElseThrow(()-> new ProjectNotFound(projectId));
        //so how does it know which todoobject to actually get the descriptions from?
        //so this creates a new todo that we are setting?
        //where does it get the features to actually do this
        TodoItem todo = new TodoItem();
        todo.setDescription(req.getDescription()); //get description from todo request dto
        todo.setCategory(req.getCategory());
        todo.setCompleted(req.isCompleted());
        todo.setPriority(req.getPriority());

        //links it to the current project
        todo.setProject(project);

        TodoItem saved = todoRepo.save(todo);
        return TodoResponse.fromEntity(saved); //returns a response dto from the previous "saved"


    }


    public List<TodoResponse> getTodosByProject(Long projectId){
         projectRepo.findById(projectId)
        .orElseThrow(() -> new ProjectNotFound(projectId));
        Specification<TodoItem> spec = Specification.allOf(belongsToProject(projectId));
        return todoRepo.findAll(spec) //find all todos in the repository that belong to a project
        .stream()
        .map(TodoResponse::fromEntity)
        .toList();
    }


    @Transactional
    public void deleteById(Long projectId){
        todoRepo.deleteByProjectId(projectId);
        projectRepo.deleteById(projectId); //deleteById is a built in method
        
    

    }

    
}