import React from "react";

function TodoForm({priority, setPriority, category, handleAddTodo, setSortByPriority, setCategory,setNewTodo, newTodo}){
  const categories = ["GENERAL", "WORK", "SCHOOL", "PERSONAL", "HEALTH"];
  const priorities = ["HIGH", "MEDIUM", "LOW"];
    return(
      
         <div className="flex flex-col space-y-3">
          <div className=" flex space-x-3">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") 
              handleAddTodo();
          }}
          placeholder="Enter a new task"
          className="flex-grow border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300 ease-in-out"
        />

        <select
          id="priority"
          value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              e.target.blur(); // closes dropdown
            }}
          
          className="border border-gray-300 rounded-lg px-2 py-2"
        >
          {priorities.map(c => (
          <option key={c} value={c}>
            {c.charAt(0) + c.slice(1).toLowerCase()}
          </option>
        ))}
        </select>

        <select
          id="category"
          value={category}
            onChange={(e) => {
            setCategory(e.target.value);
            e.target.blur(); // closes dropdown
          }}
          className="border border-gray-300 rounded-lg px-2 py-2"
        >
          {categories.map(c => (
          <option key={c} value={c}>
            {c.charAt(0) + c.slice(1).toLowerCase()}
          </option>
        ))}
        </select>

        <button
          onClick={handleAddTodo} 
          
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add
        </button>

        </div>
        

         

         <div className="flex space-x-3">
            
          <button
            onClick={() => {
              setSortByPriority("priority"); // makes it persistent by re-rendering the program instead of just useState which doesn't re render it and always has a default of false
            
            }} // on click call the function and mark it true () => is an anonymous function.
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition w-20 text-center"
          >
            Sort
          </button>

          <button
            onClick={() => {
              setSortByPriority(""); 
              
            }}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition w-15 text-center"
          >
            Unsort
          </button>
        </div>
    </div>

          
    )
} export default TodoForm;