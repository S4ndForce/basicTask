import React, { useEffect, useState } from "react"; //state management variables
import axios from "axios"; 
let currentState = false;
function App() {
  
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  //const [searchTerm, searchTodo]

  const updateTodo = async (todo) => {
    await axios.put(`http://localhost:8081/api/todos/${todo.id}`, { //use axios everytime you want the app to remember something
      description: todo.description,
      completed: todo.completed,
      category: todo.category,
      priority: todo.priority,
    });
    fetchTodos(); //refreshes my todos from the back end everytime i update it on the front
  };

  useEffect(() => {
    fetchTodos();
  }, []);


  //get button
  const fetchTodos = async (sort = sortByPriority) => {
  const res = await axios.get(`http://localhost:8081/api/todos?sortByPriority=${sort}`);
  setTodos(res.data.map((t) => ({ ...t, isEditing: false })));
  

  
};

  //default variables
  const [priority, setPriority] = useState("LOW");
  const [category, setCategory] = useState("General");
  const [sortByPriority, setSortByPriority] = useState(false);
  

  const addTodo = async () => {
    if (!newTodo.trim()) return;
        await axios.post("http://localhost:8081/api/todos", {
          description: newTodo,
          completed: false,
          category,
          priority,
        });
    setNewTodo("");
    fetchTodos();
  };

  //delete item
  const deleteTodo = async (id) => { // delete the function when deleteTodo is called, wrapped in a function, await and async just wiat to get a response
    await axios.delete(`http://localhost:8081/api/todos/${id}`);
    fetchTodos();
  };

  const deleteCompleted = async (id) => {
      const completedTodos = todos.filter(t => t.completed); //completes code based on filters
      for(const todo of completedTodos){
        await axios.delete(`http://localhost:8081/api/todos/${todo.id}`);
      }
      fetchTodos();
  }

  //change to-do item
  const toggleTodo = async (id, completed) => {
    const todo = todos.find((t) => t.id === id); //finds the todo to checkmark
    await axios.put(`http://localhost:8081/api/todos/${id}`, { //await feature makes sure the backend actually updates before moving on
      ...todo,
      completed,
    });
    fetchTodos();
  };

  return (
    
    <div className="n bg-gray-100 flex  justify-start pt-70 pl-5">  {/*Parent container that determines size of everything else */}
    {/*flex puts everything in one line, items center alligns children, space x-2 uniform space between children */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          My To-do List
        </h1>

        <div className="flex mb-4 space-x-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
          placeholder="Enter a new task"
          className="flex-grow border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
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
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Fitness">Fitness</option>
        </select>

        <button
          onClick={addTodo} 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
        <div className="flex flex-col mb-6 items-end space-y-2">
          <button
            onClick={() => {
              setSortByPriority(true); //makes it persistent by re-rendering the program instead of just useState which doesn't re render it and always has a default of false
              fetchTodos(true)}} //on click call the function and mark it true () => is an anynymous function.
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition w-20 text-center"
          >
            Sort
          </button>

          <button
            onClick={() => {
              setSortByPriority(false); 
              fetchTodos(false)}}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition w-15 text-center"
          >
            Unsort
          </button>
        </div>

       

        
</div>



        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg shadow-sm"
            >
              <div className="flex items-center flex-grow">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id, !todo.completed)}
                  className="mr-3 w-5 h-5 text-blue-500"
                />

                {todo.isEditing ? (
                 <input
                      type="text"
                      value={todo.description}
                      onChange={(e) =>
                        setTodos(
                          todos.map((t) =>
                            t.id === todo.id ? { ...t, description: e.target.value } : t
                          )
                        )
                      }
                      onBlur={(e) => {
                        const currentValue = e.target.value.trim();

                        // update React state immediately
                        setTodos(
                          todos.map((t) =>
                            t.id === todo.id ? { ...t, description: currentValue } : t
                          )
                        );

                        // then act based on the actual input value
                        if (currentValue === "") {
                          deleteTodo(todo.id);
                        } else {
                          updateTodo({
                            ...todo,
                            description: currentValue,
                          });
                        }

                        // finally close edit mode
                        setTodos((prev) =>
                          prev.map((t) => ({ ...t, isEditing: false }))
                        );
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const currentValue = e.target.value.trim();

                          if (currentValue === "") {
                            deleteTodo(todo.id);
                          } else {
                            updateTodo({
                              ...todo,
                              description: currentValue,
                            });
                          }

                          setTodos((prev) =>
                            prev.map((t) => ({ ...t, isEditing: false }))
                          );
                        } else if (e.key === "Escape") {
                          setTodos((prev) =>
                            prev.map((t) => ({ ...t, isEditing: false }))
                          );
                        }
                      }}
                      className="flex-grow border-b border-gray-400 focus:outline-none bg-transparent"
                      autoFocus
                      />

                    
                  
                ) : (
                  
                  <span
                    className={`flex-grow text-gray-800 ${
                      todo.completed ? "line-through text-gray-400" : ""
                    }`}
                    onDoubleClick={() =>
                      setTodos(
                        todos.map((t) =>
                          t.id === todo.id
                            ? { ...t, isEditing: true }
                            : t
                        )
                      )
                    }
                  >
                    {todo.description}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700 font-semibold transition"
                >
                  Delete
                </button>
              
              
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    todo.priority === "HIGH"
                      ? "bg-red-100 text-red-600"
                      : todo.priority === "MEDIUM"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {todo.priority}
                </span>
              </div>
            </li>
          ))}
        </ul>
      
      </div>
       <div
    className={`absolute right-0 top-1/2 transform -translate-y-1/2 
                transition-all duration-500 ease-in-out 
                ${todos.some(t => t.completed) ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
                  >
                    <button
                      onClick={deleteCompleted}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition"
                    >
                      Delete Completed
                    </button>
                  </div>
      <div 
      className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            
            placeholder="Search for a todo"
            className="w-64 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
</div>

    
    </div>
  );
}

export default App;
