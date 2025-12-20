import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteCompleted,
  toggleTodo,
  fetchProjects,
  createProject
} from "./services/todoService";

import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";
import TodoSearch from "./components/TodoSearch";
import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import Projects from "./components/Projects";
import ProjectAdd from "./components/ProjectAdd";
import Pages from "./components/Pages"

function App() {

// Filters
const [priority, setPriority] = useState("LOW");
const [category, setCategory] = useState("GENERAL");

 //when I type a specific todo by name, it stores it in useState and then it sends it
const[filter, setFilter]=useState("ALL");
const [todos, setTodos] = useState([]);
const [newTodo, setNewTodo] = useState("");
const [allTodos, setAllTodos] = useState([]);





const [totalPages, setTotalPages] = useState(0);
const [projects, setProjects] = useState([]);
const [selectedProjectId, setSelectedProjectId] = useState(null);
const [newProjectName, setNewProjectName] = useState("");



const [filters, setFilters] = useState({
  page: 0,
  size: 10,
  sortBy: "createdAt",
  direction: "asc",
  search: "",
  priority: null,
  category: null
});


const loadTodos = async () => {
  const res = await fetchTodos(filters, selectedProjectId);

  const items = res.data.content ?? [];

  setAllTodos(items);
  setTodos(items);
  setTotalPages(res.data.totalPages ?? 1);

  // sync page if backend corrected it
  if (filters.page !== res.data.page) {
    setFilters(prev => ({
      ...prev,
      page: res.data.page
    }));
  }

  console.log({
  filtersPage: filters.page,
  backendPage: res.data.number,
  totalPages: res.data.totalPages
});
};



const handleAddTodo = async () => { 
  if(!newTodo.trim()) return;
  await addTodo({
    description: newTodo, completed: false, category, priority
  });
  setNewTodo("");
  loadTodos();
  
}

// decides if todos are completed or not
const handleToggle = async (id, completed) => {
  const todo =todos.find(t => t.id === id); // find todos by id
  await toggleTodo(id,{... todo, completed});
  loadTodos();
    
}

const handleDelete = async (id) => {
    await deleteTodo(id);
    loadTodos();
     
};

const handleDeleteCompleted = async () =>{
    await deleteCompleted(todos);
    loadTodos();
      
};

const handleUpdate = async (id, updatedTodo) => {
  await updateTodo(id, updatedTodo);
  loadTodos();
   // only if you use this
};

const handleSelectProject = (projectId) => {
  setSelectedProjectId(projectId)
};

const handleCreateProject = async () => {
  if (!newProjectName.trim()) return;

  await createProject({ name: newProjectName });
  setNewProjectName("");
  fetchProjects(); // refresh list
};

// Page Handlers
const goPrev = () => {
  setFilters(prev => ({
    ...prev,
    page: Math.max(prev.page - 1, 0)
  }));
};

const goNext = () => {
  setFilters(prev => {
    if (prev.page >= totalPages - 1) return prev;
    return {
      ...prev,
      page: prev.page + 1
    };
  });
};
// Buttons determine bounds




useEffect(() => {
  loadTodos();
}, [filters, selectedProjectId]);

useEffect(() => {
  setFilters(prev => ({ ...prev, page: 0 }))
}, [selectedProjectId])

useEffect(() => {
  fetchProjects()
    .then(res => {
      console.log("projects fetched:", res.data);
      setProjects(res.data);
    })
    .catch(err => {
      console.error("failed to fetch projects", err);
    });
}, []);

  
const filteredTodos = (allTodos || []).filter(todo => { //fully frontend feature.
  if(filter === "ACTIVE") return !todo.completed;
  if(filter === "COMPLETED") return todo.completed;
  return true;
});



  

  return (
    
    
    <div className=" bg-gray-100 flex  justify-start pt-8 pl-5 items-start min-h-screen p-6 pr-8 relative ">  {/*Parent container that determines size of everything else */}
    {/*flex puts everything in one line, items center alligns children, space x-2 uniform space between children */}
      <div className="bg-white/95 rounded-2xl shadow-2xl border border-gray-200 
       p-6 w-[80%] max-w-3xl h-[650px] overflow-hidden relative flex flex-col">

       <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm pb-4 w-full ">
       <div className="flex items-center justify-between mb-4">
      <Projects
       projects = {projects}
       setProjects = {setProjects}
       selectedProjectId = {selectedProjectId}
      setSelectedProjectId = {setSelectedProjectId}
      />

      <ProjectAdd 
        newProjectName={newProjectName}
        setNewProjectName={setNewProjectName}
        handleCreateProject={handleCreateProject}
      />
      </div>
        
      
       <h1 className="text-3xl font-bold text-center  text-gray-800 mb-4">

          My To-do List

      </h1>
       

  
      <TodoForm 
      priority={priority} 
      setPriority={setPriority} 
      category={category} 
      handleAddTodo= {handleAddTodo} 
      setFilters={setFilters}
      setNewTodo={setNewTodo}
      newTodo={newTodo}
      setCategory={setCategory}
      />

     
        <div className="flex justify-end w-full">
      <p className="text-sm text-gray-500">
        {filteredTodos.filter(t => !t.completed).length} tasks remaining
      </p>
        </div>

      <hr className="my-4 border-gray-200" />

      <TodoFilter filter={filter} setFilter={setFilter} />

      <hr className="my-4 border-gray-200" />

      </div> 

      {/*sticky part */}

      <div className="overflow-y-auto flex-grow p-6 bg-gray-50"> {/*allows for a seperate scrolling feature*/}
      
        <TodoList
            todos={filteredTodos}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            
        />
       
        </div>
       
        <Pages
          goNext={goNext}
          goPrev={goPrev}
          page={filters.page}
          totalPages={totalPages}
        />
        
      </div>
    
      
    
 {/*if any todos are completed, then render the button*/}
 {todos.some(t => t.completed) && ( 
        <div
          className = "fixed right-6 bottom-28 transition-all duration-500 ease-in-out transform translate-x-0 opacity-100"
        >
          <button
               onClick={handleDeleteCompleted}
               className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition"
          >
                Delete Completed

          </button>
         </div>
        
      )}


<div className="ml-8">
      <TodoSearch 
      filters={filters}
      setFilters={setFilters} 
      loadTodos={loadTodos}
       />

       

      
</div>
  
      

  </div>
    
  );
}

export default App;


{/*<div
    className={`absolute right-0 top-1/2 transform -translate-y-1/2 
                transition-all duration-500 ease-in-out 
                ${todos.some(t => t.completed) ? "translate-x-0 opacity-100" : "translate-x-24 opacity-0"}`}
                  >
                    <button
                      onClick={deleteCompleted}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition"
                    >
                      Delete Completed
                    </button>
                  </div>
 */}