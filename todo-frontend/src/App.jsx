import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteCompleted,
  toggleTodo,
  fetchProjects,
  createProject,
  deleteProject
} from "./services/todoService";

import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";
import TodoSearch from "./components/TodoSearch";
import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import Projects from "./components/Projects";
import ProjectAdd from "./components/ProjectAdd";
import Pages from "./components/Pages"
import Stats from "./components/Stats"

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

const [statsRefreshKey, setStatsRefreshKey] = useState(0);


const [filters, setFilters] = useState({
  page: 0,
  size: 10,
  sortBy: "createdAt",
  direction: "asc",
  search: "",
  priority: null,
  category: null
});

const loadProjects = async () => {
  const res = await fetchProjects();
  setProjects(res.data);
};

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
  backendPage: res.data.page,
  totalPages: res.data.totalPages
});
};



const handleAddTodo = async () => { 
  if(!newTodo.trim()) return;
  await addTodo({
    description: newTodo, completed: false, category, priority
  }, selectedProjectId);
  setNewTodo("");
  loadTodos();
  setStatsRefreshKey(prev => prev + 1);
  
}

// decides if todos are completed or not
const handleToggle = async (id, completed) => {
  const todo =todos.find(t => t.id === id); // find todos by id
  await toggleTodo(id,{... todo, completed});
  loadTodos();
  setStatsRefreshKey(prev => prev + 1);
}

const handleDelete = async (id) => {
    await deleteTodo(id);
    loadTodos();
    setStatsRefreshKey(prev => prev + 1);
     
};

const handleDeleteCompleted = async () =>{
    await deleteCompleted(todos);
    loadTodos();
    setStatsRefreshKey(prev => prev + 1);
      
};

const handleUpdate = async (id, updatedTodo) => {
  await updateTodo(id, updatedTodo);
  loadTodos();
  setStatsRefreshKey(prev => prev + 1);
  
   // only if you use this
};

const handleSelectProject = (projectId) => {
  setSelectedProjectId(projectId)
};

const handleDeleteProject = async (projectId) => {
  const confirmed = window.confirm("Delete this project?");
  if (!confirmed) return;

  setSelectedProjectId(null);

  await deleteProject(projectId);

  setProjects(prev =>
    prev.filter(p => p.id !== projectId)
  );

  if (selectedProjectId === projectId) {
    setSelectedProjectId(null);
  }
setStatsRefreshKey(prev => prev + 1);
  
  loadProjects();
  
};

const handleCreateProject = async () => {
  if (!newProjectName.trim()) return;

  await createProject({ name: newProjectName });
  setNewProjectName("");
  loadTodos();
  loadProjects();
   // refresh list
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
  <div className="bg-gray-100 min-h-screen flex gap-6 p-6 items-stretch">
    

    {/* LEFT: PROJECT SIDEBAR */}
    <aside className="w-60 bg-white rounded-2xl shadow-xl border border-gray-200 
  p-4 flex flex-col h-[650px]">
      <h2 className="text-sm font-semibold text-gray-600 mb-3">
        Projects
      </h2>

      <div className="flex-1 overflow-y-auto space-y-1">
        <Projects
          projects={projects}
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
          handleDeleteProject={handleDeleteProject}
        />
      </div>

      <div className="mt-4">
        <ProjectAdd
          newProjectName={newProjectName}
          setNewProjectName={setNewProjectName}
          handleCreateProject={handleCreateProject}
        />
      </div>
      
    </aside>

    {/* CENTER: TODO APP CARD */}
    <div className="bg-white/95 rounded-2xl shadow-2xl border border-gray-200 
      p-6 w-full max-w-3xl h-[650px] overflow-hidden flex flex-col">

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm pb-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          My To-do List
        </h1>

        <TodoForm 
          priority={priority} 
          setPriority={setPriority} 
          category={category} 
          handleAddTodo={handleAddTodo} 
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

      {/* Scrollable Todo List */}
      <div className="overflow-y-auto flex-grow px-4 py-2 bg-gray-50">
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
        size={filters.size}
        totalPages={totalPages}
        setFilters={setFilters}
      />
    </div>

    {/* RIGHT: SEARCH + STATS */}
    <div className="w-80 flex flex-col gap-4 h-[650px]">
      <TodoSearch 
        filters={filters}
        setFilters={setFilters} 
        loadTodos={loadTodos}
      />

      <Stats
        selectedProjectId={selectedProjectId}
        refreshKey={statsRefreshKey}
      />
    </div>

    {/* Floating Delete Completed */}
    {todos.some(t => t.completed) && (
      <div className="fixed right-6 bottom-28">
        <button
          onClick={handleDeleteCompleted}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition"
        >
          Delete Completed
        </button>
      </div>
    )}

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