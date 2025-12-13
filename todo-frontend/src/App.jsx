import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteCompleted,
  toggleTodo
} from "./services/todoService";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";
import TodoSearch from "./components/TodoSearch";
import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";



function App() {

  //default variables
const [priority, setPriority] = useState("LOW");
const [category, setCategory] = useState("GENERAL");
const [sort, setSort] = useState("createdAt");
const [searchTerm, setSearchTerm] = useState(""); //when I type a specific todo by name, it stores it in useState and then it sends it
const[filter, setFilter]=useState("ALL");
const [todos, setTodos] = useState([]);
const [newTodo, setNewTodo] = useState("");
const [allTodos, setAllTodos] = useState([]);

const [direction, setDirection] = useState("asc");

const [page, setPage] = useState(0);
const [size, setSize] = useState(10);

const [totalPages, setTotalPages] = useState(0);
const [currentPage, setCurrentPage] = useState(0);


const [filters, setFilters] = useState({
  priority: null,
  category: null,
  search: "",
  sortBy: "createdAt",
  direction: "asc",
  page: 0,
  size: 10
})

const loadTodos = async () => { 
                 // TO the backend

      const res = await fetchTodos(filters);

                // FROM the backend
      const items = res.data.content || [];
   {
      setAllTodos(items);
      setTodos(items);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.number);
  };
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

  
useEffect(() => {
  loadTodos();
}, [searchTerm, sort, direction, priority, category, page, size, filters]);
  
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