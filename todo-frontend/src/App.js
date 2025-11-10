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
const [category, setCategory] = useState("General");
const [sortByPriority, setSortByPriority] = useState(false);
const [searchTerm, setSearchTerm] = useState(""); //when I type a specific todo by name, it stores it in useState and then it sends it
const[filter, setFilter]=useState("ALL");
const [todos, setTodos] = useState([]);
const [newTodo, setNewTodo] = useState("");



const handleAddTodo = async () => { 
  if(!newTodo.trim()) return;
  await addTodo({
    description: newTodo, completed: false, category, priority
  });
  setNewTodo("");
  loadTodos();
}

const handleToggle = async (id, completed) => {
  const todo =todos.find(t => t.id === id);
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


  
useEffect(() => {
  if (searchTerm === "") {
    loadTodos();  // when cleared, reload all
  }
  }, [searchTerm]);


useEffect(() => {
  loadTodos();           
}, [sortByPriority]);


useEffect(() => {
  loadTodos();          
}, [searchTerm]);

  useEffect(() => {
    loadTodos();
  }, []);

  
const loadTodos = async () => {
  const res = await fetchTodos(searchTerm, sortByPriority);
  setTodos(res.data.map(t => ({ ...t, isEditing: false })));
};

const filteredTodos = todos.filter(todo => {
  if(filter === "ACTIVE") return !todo.completed;
  if(filter === "COMPLETED") return todo.completed;
  return true;
});

  

  return (
    
    
    <div className="n bg-gray-100 flex  justify-start pt-70 pl-5 items-start p-6">  {/*Parent container that determines size of everything else */}
    {/*flex puts everything in one line, items center alligns children, space x-2 uniform space between children */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          My To-do List
        </h1>

      <TodoForm 
      priority={priority} 
      setPriority={setPriority} 
      category={category} 
      handleAddTodo= {handleAddTodo} 
      setSortByPriority ={setSortByPriority}
      setNewTodo={setNewTodo}
      newTodo={newTodo}
      setCategory={setCategory}
     />

      <TodoFilter filter={filter} setFilter={setFilter} />
      <TodoList
        todos={filteredTodos}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onUpdate={updateTodo}
      />

      
      </div>

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

      <TodoSearch 
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm} 
      loadTodos={loadTodos}
       />

    
    
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